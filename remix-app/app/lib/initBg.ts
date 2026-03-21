import type * as THREE_NS from "three";

// ─── 定数 ────────────────────────────────────────────────────────────────────

/** パーティクル総数 */
const PARTICLE_COUNT = 2800;

/** アイコンサンプリング解像度（px） */
const ICON_SAMPLE_SIZE = 360;

/** アイコン表示サイズ（画面短辺の割合） */
const ICON_SCALE = 0.70;

/** アイコンの右オフセット（画面幅の割合） */
const ICON_OFFSET_RATIO = 0.28;

/** 背景の星の数 */
const BG_STAR_COUNT = 80;

/** 各フェーズの持続フレーム数 */
const PHASE_DURATIONS: Record<string, number> = {
  FLYING:    300,
  GATHERING: 300,
  FORMED:    300,
};

const PHASES = ["FLYING", "GATHERING", "FORMED"] as const;

// ─── 型 ──────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  /** 目標座標 */
  tx: number; ty: number; tz: number;
  /** 基本速度スカラー */
  spd: number;
  /** 点のサイズ */
  sz: number;
}

interface Vec2 { x: number; y: number; }

// ─── エクスポート関数 ─────────────────────────────────────────────────────────

/**
 * Three.js によるパーティクル背景アニメーションを初期化する。
 * @returns アニメーションを停止してリソースを解放するクリーンアップ関数
 */
export function initBg(
  canvas: HTMLCanvasElement,
  THREE: typeof THREE_NS,
  iconDataUrls: string[],
  onFrame: (animationId: number) => void
): () => void {
  let W = window.innerWidth;
  let H = window.innerHeight;
  const DPR = Math.min(window.devicePixelRatio, 2);

  const ICON_SIZE     = Math.min(W, H) * ICON_SCALE;
  const ICON_OFFSET_X = W * ICON_OFFSET_RATIO;

  // アイコン座標系（0〜ICON_SAMPLE_SIZE）→ ワールド座標への変換
  const toWorldX = (v: number) =>  (v / ICON_SAMPLE_SIZE - 0.5) * ICON_SIZE + ICON_OFFSET_X;
  const toWorldY = (v: number) => -(v / ICON_SAMPLE_SIZE - 0.5) * ICON_SIZE;

  // ─── レンダラー ─────────────────────────────────────────────────────────────

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
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

  // rtB → rtA へのブリット用クワッド
  const blitMat   = new THREE.MeshBasicMaterial({ map: rtB.texture, depthTest: false });
  const blitScene = new THREE.Scene();
  blitScene.add(new THREE.Mesh(quadGeo, blitMat));

  // 前フレームを背景色へ向かって薄めるフェードクワッド
  const fadeMat   = new THREE.MeshBasicMaterial({
    color: 0x181c2a,
    transparent: true,
    opacity: 0.12,
    depthTest: false,
    depthWrite: false,
  });
  const fadeScene = new THREE.Scene();
  fadeScene.add(new THREE.Mesh(quadGeo, fadeMat));

  // rtA を画面へ出力するクワッド
  const outMat   = new THREE.MeshBasicMaterial({ map: rtA.texture, depthTest: false });
  const outScene = new THREE.Scene();
  outScene.add(new THREE.Mesh(quadGeo, outMat));

  // 両 RT を初期背景色でクリア
  const bgClearColor = new THREE.Color(0x181c2a);
  renderer.setClearColor(bgClearColor, 1);
  renderer.setRenderTarget(rtA); renderer.clear();
  renderer.setRenderTarget(rtB); renderer.clear();
  renderer.setRenderTarget(null); renderer.clear();

  // ─── メインシーン（OrthographicCamera：スクリーン座標と一致） ───────────────

  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 2000);
  camera.position.set(0, 0, 500);
  const scene = new THREE.Scene();

  // ─── マウス視差 ──────────────────────────────────────────────────────────────

  let mouseNX = 0; // 正規化 X（-0.5〜0.5）
  let mouseNY = 0; // 正規化 Y（-0.5〜0.5、上が正）

  const onMouseMove = (e: MouseEvent) => {
    mouseNX =  (e.clientX / W) - 0.5;
    mouseNY = -((e.clientY / H) - 0.5);
  };
  document.addEventListener("mousemove", onMouseMove, { passive: true });

  let camTargetX = 0;
  let camTargetY = 0;

  // ─── アイコンターゲット管理 ──────────────────────────────────────────────────

  let iconTargets: Vec2[]     = [];
  const allIconTargets: Vec2[][] = [[], [], [], []];
  let   iconCycle = 0;

  /** フォールバック用の円形ターゲット群を生成 */
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

  /** 全パーティクルに目標座標を割り当てる */
  function assignTargets() {
    if (!iconTargets.length) return;
    particles.forEach((p, i) => {
      const target = iconTargets[i % iconTargets.length];
      p.tx = target.x;
      p.ty = target.y;
      p.tz = 0;
    });
  }

  /**
   * PNG 画像から Sobel NMS（非最大値抑制）エッジ検出でターゲット点を抽出する。
   * クロスオリジンエラーなどで失敗した場合は円形ターゲットへフォールバック。
   */
  function sampleIconEdges(img: HTMLImageElement): Vec2[] {
    const offscreen = document.createElement("canvas");
    offscreen.width = offscreen.height = ICON_SAMPLE_SIZE;
    const ctx = offscreen.getContext("2d")!;
    ctx.drawImage(img, 0, 0, ICON_SAMPLE_SIZE, ICON_SAMPLE_SIZE);

    let pts: Vec2[] = [];

    try {
      const { data } = ctx.getImageData(0, 0, ICON_SAMPLE_SIZE, ICON_SAMPLE_SIZE);
      const S = ICON_SAMPLE_SIZE;

      const alpha = (x: number, y: number) => data[(y * S + x) * 4 + 3];

      const brightness = (x: number, y: number): number => {
        const idx = (y * S + x) * 4;
        if (data[idx + 3] < 30) return -1; // 透明ピクセルは無効
        return data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      };

      // Sobel フィルタで勾配を計算
      const magnitude = new Float32Array(S * S);
      const gradX     = new Float32Array(S * S);
      const gradY     = new Float32Array(S * S);

      for (let y = 1; y < S - 1; y++) {
        for (let x = 1; x < S - 1; x++) {
          if (alpha(x, y) < 30) continue;

          // 3×3 近傍の輝度（時計回りで TL〜BR）
          const neighbors = [
            brightness(x - 1, y - 1), brightness(x, y - 1), brightness(x + 1, y - 1),
            brightness(x - 1, y),                            brightness(x + 1, y),
            brightness(x - 1, y + 1), brightness(x, y + 1), brightness(x + 1, y + 1),
          ];
          if (neighbors.some(v => v < 0)) continue; // 透明ピクセルを含む近傍はスキップ

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

      // NMS：アルファ境界エッジとソーベル強エッジを収集
      for (let y = 1; y < S - 1; y++) {
        for (let x = 1; x < S - 1; x++) {
          // アルファ境界（不透明→透明の境目）は2倍の密度で追加
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

          // 勾配方向の隣接ピクセルと比較し、極大でなければ抑制
          const len = Math.sqrt(gradX[y * S + x] ** 2 + gradY[y * S + x] ** 2) || 1;
          const nx  = gradX[y * S + x] / len;
          const ny  = gradY[y * S + x] / len;

          const x1 = Math.round(x + nx);
          const y1 = Math.round(y + ny);
          const x2 = Math.round(x - nx);
          const y2 = Math.round(y - ny);

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

    // Fisher-Yates シャッフル
    for (let i = pts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pts[i], pts[j]] = [pts[j], pts[i]];
    }

    return pts;
  }

  // アイコン画像を非同期ロード
  const fallbackUrls = [
    "/assets/image/logo-v4.png",
    "/assets/image/logo-v3.png",
    "/assets/image/logo-v2.png",
    "/assets/image/logo-v5.png",
  ];
  const dataUrls = iconDataUrls.length > 0 ? iconDataUrls : fallbackUrls;

  dataUrls.forEach((url, i) => {
    const img = new Image();
    img.onload = () => {
      allIconTargets[i] = sampleIconEdges(img);
      // 最初の画像がロードされたらアニメーションを開始
      if (i === 0 && iconTargets.length === 0) {
        iconTargets = allIconTargets[0];
        iconCycle   = 1;
        assignTargets();
      }
    };
    img.onerror = () => {
      allIconTargets[i] = buildCircleTargets();
    };
    img.src = url;
  });

  // ─── パーティクル ────────────────────────────────────────────────────────────

  function createParticle(): Particle {
    const angle    = Math.random() * Math.PI * 2;
    const speed    = 0.15 + Math.random() * 0.35;
    const target   = iconTargets.length
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
      sz:  0.18 + Math.random() * 0.28,
    };
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  // ─── 背景の星 ────────────────────────────────────────────────────────────────

  const bgStars = Array.from({ length: BG_STAR_COUNT }, () => ({
    x:      (Math.random() - 0.5) * W * 1.3,
    y:      (Math.random() - 0.5) * H * 1.3,
    z:      -300 + Math.random() * 200,
    radius: 1.0 + Math.random() * 1.5,
    alpha:  0.1 + Math.random() * 0.25,
    phase:  Math.random() * Math.PI * 2,  // ゆらぎの位相
  }));

  // ─── GPU バッファ（パーティクル Points） ─────────────────────────────────────

  const particlePosArr  = new Float32Array(PARTICLE_COUNT * 3);
  const particleSizeArr = new Float32Array(PARTICLE_COUNT);
  const particleGeo     = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePosArr,  3));
  particleGeo.setAttribute("aSize",    new THREE.BufferAttribute(particleSizeArr, 1));

  const particleMat = new THREE.ShaderMaterial({
    uniforms: {
      uFormed: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
      uDPR:    { value: DPR },
    },
    vertexShader: `
      attribute float aSize;
      uniform float uMouseX;
      uniform float uMouseY;
      uniform float uDPR;

      void main() {
        vec3 pos = position;
        // Z 深度に応じてマウス視差を適用
        pos.x += pos.z * uMouseX * 0.25;
        pos.y += pos.z * uMouseY * 0.25;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

        // 奥行きによるサイズ補正（HiDPI 対応）
        float depth = 1.0 + pos.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
      }
    `,
    fragmentShader: `
      uniform int uFormed;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        vec3  col;
        float alpha;

        if (uFormed == 1) {
          // FORMED：中心は白、周縁はシアン
          col   = r < 0.22 ? vec3(1.0) : vec3(0.08, 0.92, 1.0);
          alpha = r < 0.22 ? 0.95 : 0.90;
        } else {
          // それ以外：ガウス風グラデーション
          float glow = pow(max(0.0, 1.0 - r * 2.0), 1.4);
          col   = mix(vec3(0.0, 0.9, 1.0), vec3(1.0), glow);
          alpha = glow * 0.92;
        }

        gl_FragColor = vec4(col, alpha);
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

  // 各パーティクルにつき始点・終点の2頂点（×3成分）
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
    uniforms: {
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
      uDPR:    { value: DPR },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aAlpha;
      uniform   float uMouseX;
      uniform   float uMouseY;
      uniform   float uDPR;
      varying   float vAlpha;

      void main() {
        vec3 pos = position;
        pos.x += pos.z * uMouseX * 0.6;
        pos.y += pos.z * uMouseY * 0.6;
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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

  // ─── フェーズ管理 ────────────────────────────────────────────────────────────

  let phaseIndex = 0;
  let phaseTimer = 0;
  let phase      = "FLYING";

  /** フェーズを次へ進め、必要な状態リセットを行う */
  function advancePhase() {
    // FLYING 開始時にアイコンがなければ円を使用
    if (phase === "FLYING" && iconTargets.length === 0) {
      iconTargets = buildCircleTargets();
      iconCycle   = 0;
      assignTargets();
    }

    // FORMED 終了後は FLYING をスキップして直接 GATHERING へ
    if (phase === "FORMED") {
      phaseIndex = PHASES.indexOf("GATHERING");
    } else {
      phaseIndex = (phaseIndex + 1) % PHASES.length;
    }
    phase      = PHASES[phaseIndex];
    phaseTimer = 0;

    if (phase === "GATHERING") {
      // 次のアイコンに切り替え
      const next = allIconTargets[iconCycle];
      if (next && next.length > 0) {
        iconTargets = next;
        iconCycle   = (iconCycle + 1) % allIconTargets.length;
        assignTargets();
      }
    }

    if (phase === "FLYING") {
      // 初回起動時のみ: パーティクルを画面全体にランダム配置
      particles.forEach(p => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.3;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.x  = (Math.random() - 0.5) * W;
        p.y  = (Math.random() - 0.5) * H;
        p.z  = (Math.random() - 0.5) * 300;
        p.vz = (Math.random() - 0.5) * 0.3;
      });
    }
  }

  // ─── パーティクル物理 ─────────────────────────────────────────────────────────

  function updateParticleFlying(p: Particle) {
    p.vx += (Math.random() - 0.5) * 0.018;
    p.vy += (Math.random() - 0.5) * 0.018;
    p.vz += (Math.random() - 0.5) * 0.008;
    p.vx *= 0.985; p.vy *= 0.985; p.vz *= 0.985;
    p.x  += p.vx;  p.y  += p.vy;  p.z  += p.vz;

    // 画面外に出たら反対側から再出現（ラップアラウンド）
    if (p.x < -W / 2) p.x += W; else if (p.x > W / 2) p.x -= W;
    if (p.y < -H / 2) p.y += H; else if (p.y > H / 2) p.y -= H;
    if (Math.abs(p.z) > 250) p.vz *= -1;
  }

  function updateParticleGathering(p: Particle, progress: number) {
    const lerpT = 0.04 + progress * 0.08;
    const prevX = p.x;
    const prevY = p.y;

    p.x  += (p.tx - p.x) * lerpT;
    p.y  += (p.ty - p.y) * lerpT;
    p.z  += (p.tz - p.z) * lerpT;
    p.vx  = p.x - prevX;
    p.vy  = p.y - prevY;
  }

  function updateParticleFormed(p: Particle) {
    const dx   = p.tx - p.x;
    const dy   = p.ty - p.y;
    const dz   = p.tz - p.z;
    const dist = Math.hypot(dx, dy, dz) || 1;
    const sp   = Math.min(dist * 0.22, 4);

    p.vx += ((dx / dist) * sp - p.vx) * 0.25;
    p.vy += ((dy / dist) * sp - p.vy) * 0.25;
    p.vz += ((dz / dist) * sp - p.vz) * 0.25;
    p.vx += (Math.random() - 0.5) * 0.5;
    p.vy += (Math.random() - 0.5) * 0.5;
    p.x  += p.vx; p.y += p.vy; p.z += p.vz;
  }

  function updateParticleDispersing(p: Particle, progress: number) {
    const SHAKE_PHASE_END = 0.18;

    if (progress < SHAKE_PHASE_END) {
      // 初期シェイク：形が崩れ始める
      const shake = Math.pow(progress / SHAKE_PHASE_END, 2) * 7;
      p.vx += (Math.random() - 0.5) * shake;
      p.vy += (Math.random() - 0.5) * shake;
      p.vz += (Math.random() - 0.5) * shake * 0.3;
      p.vx *= 0.84; p.vy *= 0.84; p.vz *= 0.84;
    } else {
      // 放射フェーズ：ターゲット位置からアイコン中心の外向きへ爆散
      const t        = (progress - SHAKE_PHASE_END) / (1 - SHAKE_PHASE_END);
      const dx       = p.tx - ICON_OFFSET_X;
      const dy       = p.ty;
      const angle    = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.1;
      const speed    = p.spd * (1.4 + t * 2);
      const strength = 0.09 * (1 + t * 3);

      p.vx += (Math.cos(angle) * speed - p.vx) * strength;
      p.vy += (Math.sin(angle) * speed - p.vy) * strength;
      p.vz += ((Math.random() - 0.5) * p.spd * 0.5 - p.vz) * 0.07;
    }

    p.x += p.vx; p.y += p.vy; p.z += p.vz;
  }

  // ─── トレイル書き込み ─────────────────────────────────────────────────────────

  function writeTrail(p: Particle, i: number, velocity: number) {
    const TRAIL_LENGTH_SCALE = 2.2;
    const TRAIL_MAX_LENGTH   = 36;
    const trailLen = Math.min(velocity * TRAIL_LENGTH_SCALE, TRAIL_MAX_LENGTH);
    const invVel   = velocity || 1;
    const nx = p.vx / invVel;
    const ny = p.vy / invVel;
    const nz = p.vz / invVel;

    // 始点（テール側：透明・シアン）
    trailPosArr[i * 6]     = p.x - nx * trailLen;
    trailPosArr[i * 6 + 1] = p.y - ny * trailLen;
    trailPosArr[i * 6 + 2] = p.z - nz * trailLen;
    trailColArr[i * 6]     = 0;   trailColArr[i * 6 + 1] = 0.9; trailColArr[i * 6 + 2] = 1.0;
    trailAlpArr[i * 2]     = 0;

    // 終点（ヘッド側：不透明・白）
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

    // フェーズ遷移チェック
    if (phaseTimer >= PHASE_DURATIONS[phase]) {
      advancePhase();
    }

    const progress = phaseTimer / PHASE_DURATIONS[phase];

    // トレイルのフェード量をフェーズに応じて調整
    fadeMat.opacity =
      phase === "FORMED"     ? 0.06 :
      phase === "GATHERING"  ? 0.20 :
      phase === "DISPERSING" ? 0.28 : 0.12;

    // カメラの視差スムーシング
    camTargetX += (mouseNX * 22 - camTargetX) * 0.04;
    camTargetY += (mouseNY * 22 - camTargetY) * 0.04;
    camera.position.x = camTargetX;
    camera.position.y = camTargetY;

    // ユニフォーム更新
    (particleMat.uniforms.uFormed as { value: number }).value = phase === "FORMED" ? 1 : 0;
    (particleMat.uniforms.uMouseX as { value: number }).value = mouseNX;
    (particleMat.uniforms.uMouseY as { value: number }).value = mouseNY;
    (bgMat.uniforms.uMouseX       as { value: number }).value = mouseNX;
    (bgMat.uniforms.uMouseY       as { value: number }).value = mouseNY;

    // 背景星のゆらぎ更新
    bgStars.forEach((star, i) => {
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

    // パーティクル物理演算 + バッファ書き込み
    const showTrails = phase === "GATHERING" || phase === "DISPERSING";
    const MIN_TRAIL_VELOCITY = 1.5;

    particles.forEach((p, i) => {
      if      (phase === "FLYING")     updateParticleFlying(p);
      else if (phase === "GATHERING")  updateParticleGathering(p, progress);
      else if (phase === "FORMED")     updateParticleFormed(p);
      else                             updateParticleDispersing(p, progress);

      // 位置・サイズをバッファに書き込み
      const velocity = Math.hypot(p.vx, p.vy);
      particlePosArr[i * 3]     = p.x;
      particlePosArr[i * 3 + 1] = p.y;
      particlePosArr[i * 3 + 2] = p.z;
      particleSizeArr[i] = phase === "FORMED"
        ? p.sz * 2.2
        : Math.max(0.5, (p.sz * 3.5 + velocity * 0.3) * 2);

      // トレイルの書き込み（速度が一定以上の場合のみ表示）
      if (showTrails && velocity > MIN_TRAIL_VELOCITY) {
        writeTrail(p, i, velocity);
      } else {
        clearTrail(i);
      }
    });

    particleGeo.attributes["position"].needsUpdate = true;
    particleGeo.attributes["aSize"].needsUpdate    = true;
    trailGeo.attributes["position"].needsUpdate    = true;
    trailGeo.attributes["aColor"].needsUpdate      = true;
    trailGeo.attributes["aAlpha"].needsUpdate      = true;

    // Ping-Pong レンダリング
    // 1. rtA に描画開始
    renderer.setRenderTarget(rtA);
    renderer.clear();

    // 2. 前フレーム（rtB）をブリット
    blitMat.map = rtB.texture;
    renderer.render(blitScene, screenCam);

    // 3. フェードクワッドで前フレームを暗化（トレイル残像）
    renderer.render(fadeScene, screenCam);

    // 4. 背景星 + パーティクルを描画
    renderer.render(scene, camera);

    // 5. rtA を画面に表示
    renderer.setRenderTarget(null);
    renderer.clear();
    outMat.map = rtA.texture;
    renderer.render(outScene, screenCam);

    // 6. RT をスワップ（rtB が次フレームの「前フレーム」になる）
    [rtA, rtB] = [rtB, rtA];
  })();

  // ─── リサイズ対応 ────────────────────────────────────────────────────────────

  const onResize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
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

    // 背景星を新しいサイズに合わせて再配置
    bgStars.forEach(star => {
      star.x = (Math.random() - 0.5) * W * 1.3;
      star.y = (Math.random() - 0.5) * H * 1.3;
    });
  };
  window.addEventListener("resize", onResize, { passive: true });

  // ─── クリーンアップ ──────────────────────────────────────────────────────────

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("mousemove", onMouseMove);
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
