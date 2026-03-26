import type * as THREE_NS from "three";

// ─── 定数 ────────────────────────────────────────────────────────────────────

/** パーティクル総数（本番の 2800 より軽量化） */
const PARTICLE_COUNT = 1000;

/** アイコンサンプリング解像度（px） */
const ICON_SAMPLE_SIZE = 360;

/** アイコン表示サイズ（コンテナ短辺の割合） */
const ICON_SCALE = 0.55;

/** 背景の星の数 */
const BG_STAR_COUNT = 40;

/** 各フェーズの持続フレーム数 */
const PHASE_DURATIONS: Record<string, number> = {
  FLYING:     120,
  GATHERING:  300,
  FORMED:     300,
  DISPERSING: 100,
};

const PHASES = ["FLYING", "GATHERING", "FORMED", "DISPERSING"] as const;

// ─── 型 ──────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  tx: number; ty: number; tz: number;
  spd: number;
  sz: number;
}

interface Vec2 { x: number; y: number; }

// ─── エクスポート関数 ─────────────────────────────────────────────────────────

/**
 * コンテナ要素内に収まるデモ用パーティクルアニメーションを初期化する。
 * 本番の initBg との主な差分：
 *   - サイズ取得 → container.clientWidth/Height
 *   - リサイズ → ResizeObserver
 *   - アイコン → 中央配置（オフセットなし）
 *   - パーティクル数 → 1000
 *   - タイルフリップ → 削除
 *   - クリック波紋 → canvas スコープ限定
 */
export function initBgDemo(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  THREE: typeof THREE_NS,
  onFrame: (animationId: number) => void
): () => void {
  let W = container.clientWidth;
  let H = container.clientHeight;
  const DPR = Math.min(window.devicePixelRatio, 2);

  // アイコン中央配置（オフセットなし）
  const ICON_SIZE     = Math.min(W, H) * ICON_SCALE;
  const ICON_OFFSET_X = 0;

  // アイコン座標系（0〜ICON_SAMPLE_SIZE）→ ワールド座標への変換
  const toWorldX = (v: number) =>  (v / ICON_SAMPLE_SIZE - 0.5) * ICON_SIZE + ICON_OFFSET_X;
  const toWorldY = (v: number) => -(v / ICON_SAMPLE_SIZE - 0.5) * ICON_SIZE;

  // ─── レンダラー ─────────────────────────────────────────────────────────────

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
  renderer.setClearColor(new THREE.Color(0x181c2a), 1);
  renderer.clear();
  renderer.setPixelRatio(DPR);
  renderer.setSize(W, H);
  renderer.autoClear = false;

  // ─── Ping-Pong レンダーターゲット（トレイル蓄積用） ──────────────────────────

  function makeRenderTarget() {
    return new THREE.WebGLRenderTarget(W * DPR, H * DPR, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });
  }
  let rtA = makeRenderTarget();
  let rtB = makeRenderTarget();

  const screenCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quadGeo   = new THREE.PlaneGeometry(2, 2);

  const blitMat   = new THREE.MeshBasicMaterial({ map: rtB.texture, depthTest: false });
  const blitScene = new THREE.Scene();
  blitScene.add(new THREE.Mesh(quadGeo, blitMat));

  const fadeMat   = new THREE.MeshBasicMaterial({
    color: 0x181c2a, transparent: true, opacity: 0.12, depthTest: false, depthWrite: false,
  });
  const fadeScene = new THREE.Scene();
  fadeScene.add(new THREE.Mesh(quadGeo, fadeMat));

  const outMat   = new THREE.MeshBasicMaterial({ map: rtA.texture, depthTest: false });
  const outScene = new THREE.Scene();
  outScene.add(new THREE.Mesh(quadGeo, outMat));

  const bgClearColor = new THREE.Color(0x181c2a);
  renderer.setClearColor(bgClearColor, 1);
  renderer.setRenderTarget(rtA); renderer.clear();
  renderer.setRenderTarget(rtB); renderer.clear();
  renderer.setRenderTarget(null); renderer.clear();

  // ─── メインシーン ────────────────────────────────────────────────────────────

  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 2000);
  camera.position.set(0, 0, 500);
  const scene = new THREE.Scene();
  // タイルは RTT に入れると fadeMat による積算で想定より何倍も明るくなる。
  // 別シーンで RTT 出力後に描画することで積算を避ける。
  const tileScene = new THREE.Scene();

  // ─── 雨滴波紋 ────────────────────────────────────────────────────────────────

  type Raindrop = { x: number; y: number; strength: number };
  let raindrops: Raindrop[] = [];
  let nextRaindropTick      = 0;

  // ─── アイコンターゲット管理 ──────────────────────────────────────────────────

  let iconTargets: Vec2[]        = [];
  const allIconTargets: Vec2[][] = [[], [], [], []];
  let   iconCycle = 0;

  function buildCircleTargets(): Vec2[] {
    const pts: Vec2[] = [];
    const r = ICON_SIZE / 2;
    for (let dy = -r; dy <= r; dy += 5) {
      for (let dx = -r; dx <= r; dx += 5) {
        if (dx * dx + dy * dy <= r * r) {
          pts.push({ x: dx + ICON_OFFSET_X, y: dy });
        }
      }
    }
    return pts;
  }

  function assignTargets() {
    if (!iconTargets.length) return;
    particles.forEach((p, i) => {
      const target = iconTargets[i % iconTargets.length];
      p.tx = target.x;
      p.ty = target.y;
      p.tz = 0;
    });
  }

  function sampleIconEdges(img: HTMLImageElement): Vec2[] {
    const offscreen = document.createElement("canvas");
    offscreen.width = offscreen.height = ICON_SAMPLE_SIZE;
    const ctx = offscreen.getContext("2d")!;
    ctx.drawImage(img, 0, 0, ICON_SAMPLE_SIZE, ICON_SAMPLE_SIZE);

    let pts: Vec2[] = [];

    try {
      const { data } = ctx.getImageData(0, 0, ICON_SAMPLE_SIZE, ICON_SAMPLE_SIZE);
      const S = ICON_SAMPLE_SIZE;

      const alpha      = (x: number, y: number) => data[(y * S + x) * 4 + 3];
      const brightness = (x: number, y: number): number => {
        const idx = (y * S + x) * 4;
        if (data[idx + 3] < 30) return -1;
        return data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      };

      const magnitude = new Float32Array(S * S);
      const gradX     = new Float32Array(S * S);
      const gradY     = new Float32Array(S * S);

      for (let y = 1; y < S - 1; y++) {
        for (let x = 1; x < S - 1; x++) {
          if (alpha(x, y) < 30) continue;

          const neighbors = [
            brightness(x - 1, y - 1), brightness(x, y - 1), brightness(x + 1, y - 1),
            brightness(x - 1, y),                            brightness(x + 1, y),
            brightness(x - 1, y + 1), brightness(x, y + 1), brightness(x + 1, y + 1),
          ];
          if (neighbors.some(v => v < 0)) continue;

          const gx = -neighbors[0] - 2 * neighbors[3] - neighbors[5]
                   +  neighbors[2] + 2 * neighbors[4] + neighbors[7];
          const gy = -neighbors[0] - 2 * neighbors[1] - neighbors[2]
                   +  neighbors[5] + 2 * neighbors[6] + neighbors[7];

          const mag = Math.sqrt(gx * gx + gy * gy);
          magnitude[y * S + x] = mag;
          gradX[y * S + x]     = gx;
          gradY[y * S + x]     = gy;
        }
      }

      for (let y = 1; y < S - 1; y++) {
        for (let x = 1; x < S - 1; x++) {
          const onAlphaBoundary =
            alpha(x, y) >= 30 &&
            (alpha(x - 1, y) < 30 || alpha(x + 1, y) < 30 ||
             alpha(x, y - 1) < 30 || alpha(x, y + 1) < 30);

          if (onAlphaBoundary) {
            pts.push({ x: toWorldX(x), y: toWorldY(y) });
            pts.push({ x: toWorldX(x), y: toWorldY(y) });
            continue;
          }

          const mag = magnitude[y * S + x];
          if (mag < 26) continue;

          const len = Math.sqrt(gradX[y * S + x] ** 2 + gradY[y * S + x] ** 2) || 1;
          const nx  = gradX[y * S + x] / len;
          const ny  = gradY[y * S + x] / len;

          const x1 = Math.round(x + nx); const y1 = Math.round(y + ny);
          const x2 = Math.round(x - nx); const y2 = Math.round(y - ny);

          const mag1 = (x1 >= 0 && x1 < S && y1 >= 0 && y1 < S) ? magnitude[y1 * S + x1] : 0;
          const mag2 = (x2 >= 0 && x2 < S && y2 >= 0 && y2 < S) ? magnitude[y2 * S + x2] : 0;

          if (mag >= mag1 && mag >= mag2) {
            pts.push({ x: toWorldX(x), y: toWorldY(y) });
          }
        }
      }
    } catch {
      return buildCircleTargets();
    }

    if (pts.length < 80) return buildCircleTargets();

    for (let i = pts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pts[i], pts[j]] = [pts[j], pts[i]];
    }

    return pts;
  }

  // デモはアイコン b64 スクリプトを読まず直接 fallback URL を使用
  const fallbackUrls = [
    "/assets/image/logo-v4.png",
    "/assets/image/logo-v3.png",
    "/assets/image/logo-v2.png",
    "/assets/image/logo-v5.png",
  ];
  fallbackUrls.forEach((url, i) => {
    const img = new Image();
    img.onload = () => {
      allIconTargets[i] = sampleIconEdges(img);
      if (i === 0) {
        iconTargets = allIconTargets[0];
        iconCycle   = 1;
        assignTargets();
      }
    };
    img.onerror = () => { allIconTargets[i] = buildCircleTargets(); };
    img.src = url;
  });

  // ─── パーティクル ────────────────────────────────────────────────────────────

  function createParticle(): Particle {
    const angle  = Math.random() * Math.PI * 2;
    const speed  = 0.15 + Math.random() * 0.35;
    const target = iconTargets.length
      ? iconTargets[Math.floor(Math.random() * iconTargets.length)]
      : { x: 0, y: 0 };

    return {
      x:  (Math.random() - 0.5) * W,
      y:  (Math.random() - 0.5) * H,
      z:  (Math.random() - 0.5) * 300,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      vz: (Math.random() - 0.5) * 0.3,
      tx: target.x, ty: target.y, tz: 0,
      spd: 5 + Math.random() * 6,
      sz:  0.35 + Math.random() * 0.25,
    };
  }

  iconTargets = buildCircleTargets();
  iconCycle   = 0;
  const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  assignTargets();

  // ─── 背景の星 ────────────────────────────────────────────────────────────────

  const bgStars = Array.from({ length: BG_STAR_COUNT }, () => {
    const x = (Math.random() - 0.5) * W * 1.3;
    const y = (Math.random() - 0.5) * H * 1.3;
    return {
      x, y, ox: x, oy: y, vx: 0, vy: 0,
      z:      -300 + Math.random() * 200,
      radius: 1.0 + Math.random() * 1.5,
      alpha:  0.30 + Math.random() * 0.45,
      phase:  Math.random() * Math.PI * 2,
    };
  });

  // ─── GPU バッファ（パーティクル Points） ─────────────────────────────────────

  const particlePosArr   = new Float32Array(PARTICLE_COUNT * 3);
  const particleSizeArr  = new Float32Array(PARTICLE_COUNT);
  const particleAlphaArr = new Float32Array(PARTICLE_COUNT).fill(1);
  const particleGeo      = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePosArr,   3));
  particleGeo.setAttribute("aSize",    new THREE.BufferAttribute(particleSizeArr,  1));
  particleGeo.setAttribute("aAlpha",   new THREE.BufferAttribute(particleAlphaArr, 1));

  const particleMat = new THREE.ShaderMaterial({
    uniforms: {
      uPhaseT: { value: 0.0 },
      uDPR:    { value: DPR },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aAlpha;
      uniform float uDPR;
      varying float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        float depth = 1.0 + position.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
        vAlpha = aAlpha;
      }
    `,
    fragmentShader: `
      uniform float uPhaseT;
      varying float vAlpha;

      void main() {
        if (uPhaseT < 0.0) discard;
        if (vAlpha < 0.01) discard;

        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        vec3 jade    = vec3(0.20, 1.00, 0.65);
        vec3 emerald = vec3(0.00, 1.00, 0.55);

        vec3  col;
        float alpha;

        if (uPhaseT >= 2.0) {
          col   = r < 0.22 ? emerald : jade;
          alpha = r < 0.22 ? 0.95 : 0.90;
        } else {
          col   = jade;
          alpha = 0.90;
        }

        gl_FragColor = vec4(col, alpha * vAlpha);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthTest:   false,
    depthWrite:  false,
  });

  const particleMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particleMesh);

  // ─── GPU バッファ（トレイル LineSegments） ────────────────────────────────────

  const trailPosArr = new Float32Array(PARTICLE_COUNT * 6);
  const trailColArr = new Float32Array(PARTICLE_COUNT * 6);
  const trailAlpArr = new Float32Array(PARTICLE_COUNT * 2);
  const trailGeo    = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPosArr, 3));
  trailGeo.setAttribute("aColor",   new THREE.BufferAttribute(trailColArr, 3));
  trailGeo.setAttribute("aAlpha",   new THREE.BufferAttribute(trailAlpArr, 1));

  const trailMat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute vec3  aColor;
      attribute float aAlpha;
      varying   vec3  vColor;
      varying   float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vColor = aColor;
        vAlpha = aAlpha;
      }
    `,
    fragmentShader: `
      varying vec3  vColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthTest:   false,
    depthWrite:  false,
  });

  const trailMesh = new THREE.LineSegments(trailGeo, trailMat);
  scene.add(trailMesh);

  // ─── GPU バッファ（背景星 Points） ───────────────────────────────────────────

  const bgPosBuf  = new Float32Array(BG_STAR_COUNT * 3);
  const bgSizeBuf = new Float32Array(BG_STAR_COUNT);
  const bgAlpBuf  = new Float32Array(BG_STAR_COUNT);
  const bgGeo     = new THREE.BufferGeometry();
  bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPosBuf,  3));
  bgGeo.setAttribute("aSize",    new THREE.BufferAttribute(bgSizeBuf, 1));
  bgGeo.setAttribute("aAlpha",   new THREE.BufferAttribute(bgAlpBuf,  1));

  const bgMat = new THREE.ShaderMaterial({
    uniforms: { uDPR: { value: DPR } },
    vertexShader: `
      attribute float aSize;
      attribute float aAlpha;
      uniform   float uDPR;
      varying   float vAlpha;

      void main() {
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uDPR;
        vAlpha       = aAlpha;
      }
    `,
    fragmentShader: `
      varying float vAlpha;

      void main() {
        vec2  uv = gl_PointCoord - 0.5;
        float r  = length(uv);
        if (r > 0.5) discard;
        float glow = 1.0 - r * 2.0;
        gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha * glow * glow);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
    depthTest:   false,
    depthWrite:  false,
  });

  const bgMesh = new THREE.Points(bgGeo, bgMat);
  scene.add(bgMesh);

  // ─── 波紋リングプール ─────────────────────────────────────────────────────────

  const RIPPLE_SEGS = 48;
  const RIPPLE_MAX  = 8;

  const _ringBase = new Float32Array(RIPPLE_SEGS * 3);
  for (let i = 0; i < RIPPLE_SEGS; i++) {
    const a = (i / RIPPLE_SEGS) * Math.PI * 2;
    _ringBase[i * 3]     = Math.cos(a);
    _ringBase[i * 3 + 1] = Math.sin(a);
    _ringBase[i * 3 + 2] = 0;
  }

  interface RippleRing {
    mesh: THREE.LineLoop; mat: THREE.LineBasicMaterial;
    r: number; maxR: number; active: boolean;
  }

  const rippleRings: RippleRing[] = Array.from({ length: RIPPLE_MAX }, () => {
    const geo  = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(_ringBase.slice(), 3));
    const mat  = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x33ffa6), transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false,
    });
    const mesh = new THREE.LineLoop(geo, mat);
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, mat, r: 0, maxR: 100, active: false };
  });

  function spawnRipple(worldX: number, worldY: number) {
    const free = rippleRings.find(r => !r.active);
    if (!free) return;
    free.r    = 0;
    free.maxR = 60 + Math.random() * 80;
    free.mesh.position.set(worldX, worldY, 20);
    free.mesh.visible = true;
    free.active       = true;
  }

  // クリック座標はコンテナ相対で取得（window ではなく canvas スコープに限定）
  const onRippleClick = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const wx   = (e.clientX - rect.left) - W / 2;
    const wy   = H / 2 - (e.clientY - rect.top);
    spawnRipple(wx, wy);
  };
  canvas.addEventListener("click", onRippleClick, { passive: true });

  // ─── タイルフリップ ───────────────────────────────────────────────────────────

  const TILE_SIZE  = Math.round(Math.min(W, H) / 28);
  const TILE_COLS  = Math.ceil(W / TILE_SIZE) + 1;
  const TILE_ROWS  = Math.ceil(H / TILE_SIZE) + 1;
  const TILE_COUNT = TILE_COLS * TILE_ROWS;

  const AST_RADIUS = Math.max(3, Math.floor(Math.min(TILE_COLS, TILE_ROWS) * 0.12));
  let astCenterCol = Math.floor(TILE_COLS / 2);
  let astCenterRow = Math.floor(TILE_ROWS / 2);
  let astPhaseT    = 0;

  const tileFlipAngles = new Float32Array(TILE_COUNT);
  const tileDelays     = new Float32Array(TILE_COUNT);
  const tileIsAsterisk = new Float32Array(TILE_COUNT);
  const tileAlphas     = new Float32Array(TILE_COUNT);
  const tileIdxArr     = new Float32Array(TILE_COUNT);
  for (let i = 0; i < TILE_COUNT; i++) tileIdxArr[i] = i;

  function refreshAsterisk(newCol: number, newRow: number) {
    astCenterCol = Math.max(AST_RADIUS, Math.min(TILE_COLS - 1 - AST_RADIUS, newCol));
    astCenterRow = Math.max(AST_RADIUS, Math.min(TILE_ROWS - 1 - AST_RADIUS, newRow));
    const maxDist = Math.sqrt(TILE_COLS ** 2 + TILE_ROWS ** 2);
    for (let row = 0; row < TILE_ROWS; row++) {
      for (let col = 0; col < TILE_COLS; col++) {
        const i  = row * TILE_COLS + col;
        const dx = col - astCenterCol;
        const dy = row - astCenterRow;
        const isAst = Math.max(Math.abs(dx), Math.abs(dy)) <= AST_RADIUS &&
                      (dy === 0 || dx === 0 || Math.abs(dx) === Math.abs(dy));
        tileIsAsterisk[i] = isAst ? 1.0 : 0.0;
        tileDelays[i]     = Math.sqrt(dx * dx + dy * dy) / maxDist;
        tileAlphas[i]     = 0.50;
      }
    }
    tileAstAttr.needsUpdate   = true;
    tileAlphaAttr.needsUpdate = true;
  }

  const tileGeo = new THREE.PlaneGeometry(TILE_SIZE - 2, TILE_SIZE - 2);
  const tileMat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float aFlipAngle;
      attribute float aIsAsterisk;
      attribute float aAlpha;
      attribute float aTileIdx;
      varying   float vIsAsterisk;
      varying   float vAlpha;
      varying   float vHash;

      void main() {
        // Y 軸でフリップ（カードめくり）
        float c  = cos(aFlipAngle);
        float s  = sin(aFlipAngle);
        vec3  pos = vec3(position.x * c, position.y, position.z + abs(position.x) * s * 0.5);

        gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vIsAsterisk  = aIsAsterisk;
        vAlpha       = aAlpha;
        vHash        = mod(aTileIdx * 1.61803, 1.0);
      }
    `,
    fragmentShader: `
      varying float vIsAsterisk;
      varying float vAlpha;
      varying float vHash;

      void main() {
        // 裏面（flip 中）はバイナリ風のノイズを表示
        float cell = step(0.5, fract(vHash * 7.3 + gl_FragCoord.x * 0.11 + gl_FragCoord.y * 0.17));
        vec3  binColor = mix(
          vec3(0.04, 0.10, 0.12),  // 暗: 背景に近い色
          vec3(0.05, 0.22, 0.26),  // 明: うっすらシアン
          cell
        );

        vec3 astColor = vec3(0.0, 0.85, 1.0); // アスタリスク: シアン

        vec3  col   = vIsAsterisk > 0.5 ? astColor : binColor;
        float alpha = vAlpha;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending:    THREE.NormalBlending,
    depthTest:   false,
    depthWrite:  false,
    side:        THREE.DoubleSide,
  });

  const tileMesh = new THREE.InstancedMesh(tileGeo, tileMat, TILE_COUNT);
  const _tMat4   = new THREE.Matrix4();
  for (let row = 0; row < TILE_ROWS; row++) {
    for (let col = 0; col < TILE_COLS; col++) {
      const i  = row * TILE_COLS + col;
      const wx = (col + 0.5) * TILE_SIZE - W / 2;
      const wy = H / 2 - (row + 0.5) * TILE_SIZE;
      _tMat4.setPosition(wx, wy, -80);
      tileMesh.setMatrixAt(i, _tMat4);
    }
  }
  tileMesh.instanceMatrix.needsUpdate = true;
  tileScene.add(tileMesh);

  const tileFlipAttr  = new THREE.InstancedBufferAttribute(tileFlipAngles, 1);
  const tileAstAttr   = new THREE.InstancedBufferAttribute(tileIsAsterisk, 1);
  const tileAlphaAttr = new THREE.InstancedBufferAttribute(tileAlphas,     1);
  const tileIdxAttr   = new THREE.InstancedBufferAttribute(tileIdxArr,     1);
  tileGeo.setAttribute("aFlipAngle",  tileFlipAttr);
  tileGeo.setAttribute("aIsAsterisk", tileAstAttr);
  tileGeo.setAttribute("aAlpha",      tileAlphaAttr);
  tileGeo.setAttribute("aTileIdx",    tileIdxAttr);

  // デモはアイコン中央配置なのでアスタリスクを画面全体でドリフトさせる
  const astColMin = AST_RADIUS + 1;
  const astColMax = TILE_COLS - AST_RADIUS - 2;
  const astColMid = (astColMax + astColMin) / 2;
  const astColAmp = (astColMax - astColMin) / 2;

  refreshAsterisk(Math.floor(astColMid), Math.floor(TILE_ROWS / 2));

  tileFlipAngles.fill(Math.PI);
  tileFlipAttr.needsUpdate = true;

  let tileAnimPhase = "HOLD";
  let tileAnimTimer = 0;
  const T_WAVE   = 70;
  const T_SINGLE = 18;
  const T_HOLD   = 150;

  // ─── フェーズ管理 ────────────────────────────────────────────────────────────

  let phaseIndex = PHASES.indexOf("GATHERING");
  let phaseTimer = 0;
  let phase      = "GATHERING";

  function advancePhase() {
    if (phase === "FLYING" && iconTargets.length === 0) {
      iconTargets = buildCircleTargets();
      iconCycle   = 0;
      assignTargets();
    }

    if (phase === "DISPERSING") {
      phaseIndex = PHASES.indexOf("GATHERING");
    } else {
      phaseIndex = (phaseIndex + 1) % PHASES.length;
    }
    if (phase === "FORMED") raindrops = [];
    phase      = PHASES[phaseIndex];
    phaseTimer = 0;

    if (phase === "GATHERING") {
      const next = allIconTargets[iconCycle];
      if (next && next.length > 0) {
        iconTargets = next;
        iconCycle   = (iconCycle + 1) % allIconTargets.length;
        assignTargets();
      }
    }

    if (phase === "FLYING") {
      particles.forEach(p => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.3;
        p.vx = Math.cos(angle) * speed; p.vy = Math.sin(angle) * speed;
        p.x  = (Math.random() - 0.5) * W; p.y = (Math.random() - 0.5) * H;
        p.z  = (Math.random() - 0.5) * 300; p.vz = (Math.random() - 0.5) * 0.3;
      });
    }
  }

  // ─── パーティクル物理 ─────────────────────────────────────────────────────────

  function updateParticleFlying(p: Particle) {
    p.x += (p.tx - p.x) * 0.06;
    p.y += (p.ty - p.y) * 0.06;
    p.z += (0    - p.z) * 0.06;
  }

  function updateParticleGathering(p: Particle, progress: number) {
    const lerpT = 0.04 + progress * 0.08;
    const prevX = p.x;
    const prevY = p.y;

    const dx   = p.tx - p.x;
    const dy   = p.ty - p.y;
    const dist = Math.hypot(dx, dy) || 1;

    const spiralStrength = Math.max(0, 1.0 - progress * 1.5) * 0.12;
    const perpX = -dy / dist;
    const perpY =  dx / dist;

    p.x += (p.tx - p.x) * lerpT + perpX * Math.min(dist, 80) * spiralStrength;
    p.y += (p.ty - p.y) * lerpT + perpY * Math.min(dist, 80) * spiralStrength;
    p.z += (p.tz - p.z) * lerpT;
    p.vx = p.x - prevX;
    p.vy = p.y - prevY;
  }

  function updateParticleFormed(p: Particle, currentTick: number) {
    const dx   = p.tx - p.x;
    const dy   = p.ty - p.y;
    const dz   = p.tz - p.z;
    const dist = Math.hypot(dx, dy, dz) || 1;
    const sp   = Math.min(dist * 0.22, 4);

    const ownPhase   = (p.tx * 0.07 + p.ty * 0.05) % (Math.PI * 2);
    const pulse      = Math.sin(currentTick * 0.04 + ownPhase) * 0.8;
    const driftAngle = currentTick * 0.008 + ownPhase;
    const driftX     = Math.cos(driftAngle) * 0.02;
    const driftY     = Math.sin(driftAngle) * 0.02;

    p.vx += ((dx / dist) * (sp + pulse) - p.vx) * 0.18 + driftX;
    p.vy += ((dy / dist) * (sp + pulse) - p.vy) * 0.18 + driftY;
    p.vz += ((dz / dist) * sp - p.vz) * 0.18;
    p.vx += (Math.random() - 0.5) * 0.5;
    p.vy += (Math.random() - 0.5) * 0.5;
    p.x  += p.vx; p.y += p.vy; p.z += p.vz;
  }

  function updateParticleDispersing(p: Particle, progress: number) {
    const SHAKE_PHASE_END = 0.18;

    if (progress < SHAKE_PHASE_END) {
      const shake = Math.pow(progress / SHAKE_PHASE_END, 2) * 7;
      p.vx += (Math.random() - 0.5) * shake;
      p.vy += (Math.random() - 0.5) * shake;
      p.vz += (Math.random() - 0.5) * shake * 0.3;
      p.vx *= 0.84; p.vy *= 0.84; p.vz *= 0.84;
    } else {
      const t     = (progress - SHAKE_PHASE_END) / (1 - SHAKE_PHASE_END);
      // ICON_OFFSET_X=0 なので中心から外向き
      const dx    = p.tx - ICON_OFFSET_X;
      const dy    = p.ty;
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.1;
      const speed = p.spd * (1.4 + t * 2);
      const str   = 0.09 * (1 + t * 3);

      p.vx += (Math.cos(angle) * speed - p.vx) * str;
      p.vy += (Math.sin(angle) * speed - p.vy) * str;
      p.vz += ((Math.random() - 0.5) * p.spd * 0.5 - p.vz) * 0.07;
    }

    p.x += p.vx; p.y += p.vy; p.z += p.vz;
  }

  // ─── トレイル書き込み ─────────────────────────────────────────────────────────

  function writeTrail(p: Particle, i: number, velocity: number, colorT: number) {
    const TRAIL_LENGTH_SCALE = 2.2;
    const TRAIL_MAX_LENGTH   = 36;
    const trailLen = Math.min(velocity * TRAIL_LENGTH_SCALE, TRAIL_MAX_LENGTH);
    const invVel   = velocity || 1;
    const nx = p.vx / invVel;
    const ny = p.vy / invVel;
    const nz = p.vz / invVel;

    const tr = 0.20 * colorT;
    const tg = 0.9  + 0.10 * colorT;
    const tb = 1.0  - 0.35 * colorT;
    trailPosArr[i * 6]     = p.x - nx * trailLen;
    trailPosArr[i * 6 + 1] = p.y - ny * trailLen;
    trailPosArr[i * 6 + 2] = p.z - nz * trailLen;
    trailColArr[i * 6]     = tr; trailColArr[i * 6 + 1] = tg; trailColArr[i * 6 + 2] = tb;
    trailAlpArr[i * 2]     = 0;

    trailPosArr[i * 6 + 3] = p.x;
    trailPosArr[i * 6 + 4] = p.y;
    trailPosArr[i * 6 + 5] = p.z;
    trailColArr[i * 6 + 3] = 1.0; trailColArr[i * 6 + 4] = 1.0; trailColArr[i * 6 + 5] = 1.0;
    trailAlpArr[i * 2 + 1] = 0.75;
  }

  function clearTrail(i: number) {
    for (let k = 0; k < 6; k++) {
      trailPosArr[i * 6 + k] = 0;
      trailColArr[i * 6 + k] = 0;
    }
    trailAlpArr[i * 2]     = 0;
    trailAlpArr[i * 2 + 1] = 0;
  }

  // ─── メインループ ────────────────────────────────────────────────────────────

  let tick   = 0;
  let animId = 0;

  (function loop() {
    animId = requestAnimationFrame(loop);
    onFrame(animId);
    tick++;
    phaseTimer++;

    if (phaseTimer >= PHASE_DURATIONS[phase]) advancePhase();

    const progress = phaseTimer / PHASE_DURATIONS[phase];

    if ((phase === "FORMED" || phase === "DISPERSING") && phaseTimer === 1) {
      renderer.setRenderTarget(rtA); renderer.clear();
      renderer.setRenderTarget(rtB); renderer.clear();
      renderer.setRenderTarget(null);
    }
    fadeMat.opacity = phase === "GATHERING" ? 0.28 : phase === "DISPERSING" ? 0.22 : 0.12;

    camera.position.x = 0;
    camera.position.y = 0;

    const uPhaseT =
      phase === "FORMED"     ? 2.0 :
      phase === "GATHERING"  ? progress :
      phase === "DISPERSING" ? 2.0 - progress :
      /* FLYING */             -1.0;
    (particleMat.uniforms.uPhaseT as { value: number }).value = uPhaseT;

    // 背景星のゆらぎ更新
    bgStars.forEach((star, i) => {
      star.vx += (star.ox - star.x) * 0.02;
      star.vy += (star.oy - star.y) * 0.02;
      star.vx *= 0.88; star.vy *= 0.88;
      star.x  += star.vx; star.y  += star.vy;

      const animAlpha = star.alpha * (0.5 + 0.5 * Math.sin(tick * 0.016 + star.phase));
      bgPosBuf[i * 3]     = star.x;
      bgPosBuf[i * 3 + 1] = star.y;
      bgPosBuf[i * 3 + 2] = star.z;
      bgSizeBuf[i]        = star.radius * 2;
      bgAlpBuf[i]         = animAlpha;
    });
    bgGeo.attributes["position"].needsUpdate = true;
    bgGeo.attributes["aSize"].needsUpdate    = true;
    bgGeo.attributes["aAlpha"].needsUpdate   = true;

    // 波紋リング更新
    rippleRings.forEach(ring => {
      if (!ring.active) return;
      ring.r += 0.9;
      const t          = ring.r / ring.maxR;
      ring.mat.opacity = 0.55 * Math.pow(1 - t, 1.5);
      ring.mesh.scale.setScalar(ring.r);
      if (ring.r >= ring.maxR) {
        ring.active       = false;
        ring.mesh.visible = false;
        ring.mat.opacity  = 0;
      }
    });

    // ─── タイルフリップ更新 ──────────────────────────────────────────────────────
    tileAnimTimer++;
    const _tp = tileAnimPhase;

    if (_tp === "HOLD" && tileAnimTimer > T_HOLD) {
      astPhaseT += 0.8;
      const newCol = Math.floor(astColMid + Math.sin(astPhaseT)        * astColAmp);
      const newRow = Math.floor(TILE_ROWS / 2 + Math.cos(astPhaseT * 0.7) * TILE_ROWS * 0.3);
      refreshAsterisk(newCol, newRow);
      for (let i = 0; i < TILE_COUNT; i++) {
        tileFlipAngles[i] = tileIsAsterisk[i] > 0.5 ? 0 : Math.PI;
      }
      tileFlipAttr.needsUpdate = true;
      tileAnimPhase = "WAVE_IN"; tileAnimTimer = 0;
    } else if (_tp === "WAVE_IN" && tileAnimTimer > T_WAVE + T_SINGLE) {
      tileAnimPhase = "HOLD"; tileAnimTimer = 0;
    }

    if (tileAnimPhase === "WAVE_IN") {
      let changed = false;
      for (let i = 0; i < TILE_COUNT; i++) {
        if (tileIsAsterisk[i] > 0.5 && tileFlipAngles[i] < Math.PI) {
          const t = Math.max(0, Math.min(1, (tileAnimTimer - tileDelays[i] * T_WAVE) / T_SINGLE));
          tileFlipAngles[i] = t * Math.PI;
          changed = true;
        }
      }
      if (changed) tileFlipAttr.needsUpdate = true;
    }

    // 雨滴スポーン（FORMED フェーズのみ）
    if (phase === "FORMED" && tick >= nextRaindropTick && raindrops.length < 5) {
      raindrops.push({
        x:        (Math.random() - 0.5) * W,
        y:        (Math.random() - 0.5) * H,
        strength: 0.8 + Math.random() * 0.7,
      });
      nextRaindropTick = tick + 18 + Math.floor(Math.random() * 18);
    }

    if (raindrops.length > 0) {
      bgStars.forEach(star => {
        raindrops.forEach(drop => {
          const wx    = star.x - drop.x;
          const wy    = star.y - drop.y;
          const wd    = Math.hypot(wx, wy) || 1;
          const force = Math.min((drop.strength * 40) / (wd * 0.03 + 1), 5);
          star.vx += (wx / wd) * force;
          star.vy += (wy / wd) * force;
        });
      });
      raindrops = raindrops.filter(drop => {
        drop.strength *= 0.97;
        return drop.strength > 0.05;
      });
    }

    // パーティクル物理演算
    const showTrails       = phase === "GATHERING" || phase === "DISPERSING";
    const MIN_TRAIL_VELOCITY = 1.5;

    particles.forEach((p, i) => {
      if      (phase === "FLYING")     updateParticleFlying(p);
      else if (phase === "GATHERING")  updateParticleGathering(p, progress);
      else if (phase === "FORMED")     updateParticleFormed(p, tick);
      else                             updateParticleDispersing(p, progress);

      particlePosArr[i * 3]     = p.x;
      particlePosArr[i * 3 + 1] = p.y;
      particlePosArr[i * 3 + 2] = p.z;
      particleSizeArr[i] = p.sz * 4.0;

      const velocity = Math.hypot(p.vx, p.vy);

      // アルファ（中心円マスク）: ICON_OFFSET_X=0 なので中心が原点
      let particleVisible = true;
      if (phase === "GATHERING") {
        const tdx        = p.x - p.tx;
        const tdy        = p.y - p.ty;
        const distToTgt  = Math.sqrt(tdx * tdx + tdy * tdy);
        const tgtWeight  = Math.max(0, 1 - progress * 1.5);
        const alphaByTgt = Math.min(1, Math.max(0, 1 - distToTgt / (ICON_SIZE * 0.2))) * tgtWeight;
        const cdx           = p.x - ICON_OFFSET_X;
        const distToCenter  = Math.sqrt(cdx * cdx + p.y * p.y);
        const circleRadius  = ICON_SIZE * 0.48 * progress;
        const alphaByCircle = Math.min(1, Math.max(0, (circleRadius - distToCenter) / (ICON_SIZE * 0.06)));
        particleAlphaArr[i] = Math.max(alphaByTgt, alphaByCircle);
        particleVisible = particleAlphaArr[i] > 0.01;
      } else if (phase === "FORMED") {
        const cdx          = p.x - ICON_OFFSET_X;
        const distToCenter = Math.sqrt(cdx * cdx + p.y * p.y);
        particleAlphaArr[i] = Math.min(1, Math.max(0, (ICON_SIZE * 0.48 - distToCenter) / (ICON_SIZE * 0.06)));
        particleVisible = particleAlphaArr[i] > 0.01;
      } else if (phase === "DISPERSING") {
        const cdx = p.x - ICON_OFFSET_X;
        const distToCenter = Math.sqrt(cdx * cdx + p.y * p.y);
        const circleAlpha  = Math.min(1, Math.max(0, (ICON_SIZE * 0.48 - distToCenter) / (ICON_SIZE * 0.06)));
        const maskWeight   = Math.max(0, 1 - progress * 5);
        const baseAlpha    = Math.max(circleAlpha * maskWeight, 1 - maskWeight);
        const fadeOut      = progress < 0.7 ? 1.0 : Math.max(0, 1 - (progress - 0.7) / 0.3);
        particleAlphaArr[i] = baseAlpha * fadeOut;
        particleVisible = particleAlphaArr[i] > 0.01;
      } else {
        particleAlphaArr[i] = 1.0;
      }

      const trailColorT = phase === "GATHERING" ? progress : phase === "DISPERSING" ? 1.0 - progress : 0.0;
      if (showTrails && velocity > MIN_TRAIL_VELOCITY && particleVisible) {
        writeTrail(p, i, velocity, trailColorT);
      } else {
        clearTrail(i);
      }
    });

    particleGeo.attributes["position"].needsUpdate = true;
    particleGeo.attributes["aSize"].needsUpdate    = true;
    particleGeo.attributes["aAlpha"].needsUpdate   = true;
    trailGeo.attributes["position"].needsUpdate    = true;
    trailGeo.attributes["aColor"].needsUpdate      = true;
    trailGeo.attributes["aAlpha"].needsUpdate      = true;

    // Ping-Pong レンダリング
    renderer.setRenderTarget(rtA);
    renderer.clear();
    blitMat.map = rtB.texture;
    renderer.render(blitScene, screenCam);
    renderer.render(fadeScene, screenCam);
    renderer.render(scene, camera);

    renderer.setRenderTarget(null);
    renderer.clear();
    outMat.map = rtA.texture;
    renderer.render(outScene, screenCam);

    // タイルを RTT 出力の上に描画（RTT 積算を避けつつパーティクルの前に乗せる）
    renderer.render(tileScene, camera);

    [rtA, rtB] = [rtB, rtA];
  })();

  // ─── リサイズ対応（ResizeObserver でコンテナに追従） ─────────────────────────

  const resizeObserver = new ResizeObserver(() => {
    W = container.clientWidth;
    H = container.clientHeight;
    renderer.setSize(W, H);

    camera.left   = -W / 2; camera.right  =  W / 2;
    camera.top    =  H / 2; camera.bottom = -H / 2;
    camera.updateProjectionMatrix();

    rtA.setSize(W * DPR, H * DPR);
    rtB.setSize(W * DPR, H * DPR);

    renderer.setClearColor(bgClearColor, 1);
    renderer.setRenderTarget(rtA); renderer.clear();
    renderer.setRenderTarget(rtB); renderer.clear();
    renderer.setRenderTarget(null);

    bgStars.forEach(star => {
      star.x = (Math.random() - 0.5) * W * 1.3;
      star.y = (Math.random() - 0.5) * H * 1.3;
    });
  });
  resizeObserver.observe(container);

  // ─── クリーンアップ ──────────────────────────────────────────────────────────

  return () => {
    cancelAnimationFrame(animId);
    resizeObserver.disconnect();
    canvas.removeEventListener("click", onRippleClick);
    rippleRings.forEach(ring => {
      ring.mesh.geometry.dispose();
      ring.mat.dispose();
    });
    tileGeo.dispose();
    tileMat.dispose();
    renderer.dispose();
    rtA.dispose();
    rtB.dispose();
    particleGeo.dispose();
    particleMat.dispose();
    trailGeo.dispose();
    trailMat.dispose();
    bgGeo.dispose();
    bgMat.dispose();
  };
}
