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
  FLYING:     120,  // 不可視フェーズ。この間に画像をロードしパーティクルをターゲットへ事前収束させる。
  GATHERING:  300,
  FORMED:     300,
  DISPERSING: 100,  // 爆散フェーズ。FORMED 終了後にパーティクルを外側へ吹き飛ばす。
};

const PHASES = ["FLYING", "GATHERING", "FORMED", "DISPERSING"] as const;

// ─── 型 ──────────────────────────────────────────────────────────────────────

/** Three.js パーティクル背景アニメーションの1粒子 */
interface Particle {
  /** 現在の X 座標（ワールド空間） */
  x: number;
  /** 現在の Y 座標（ワールド空間） */
  y: number;
  /** 現在の Z 座標（ワールド空間） */
  z: number;
  /** X 方向の速度 */
  vx: number;
  /** Y 方向の速度 */
  vy: number;
  /** Z 方向の速度 */
  vz: number;
  /** 目標 X 座標（収束先） */
  tx: number;
  /** 目標 Y 座標（収束先） */
  ty: number;
  /** 目標 Z 座標（収束先） */
  tz: number;
  /** 爆散フェーズで使用する基本速度スカラー */
  spd: number;
  /** gl_PointSize の基準サイズ */
  sz: number;
}

/** 2D ベクトル（アイコンターゲット座標の受け渡しに使用） */
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

  // preserveDrawingBuffer: true により、F5/ページ遷移で JS が停止した後も
  // WebGL の最終フレーム（暗色）がキャンバスに残り、白発光を防ぐ。
  // デフォルト false ではブラウザがバッファを即時破棄して白になる。
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
  // WebGL のデフォルト状態による白発光を防ぐため、最速で暗色クリアを実行する。
  // setSize より前に setClearColor + clear() を呼ぶことで、
  // レンダラー生成〜初期フレームの間もキャンバスが暗い状態を保つ。
  // Three.js r152 以降で outputColorSpace のデフォルトが SRGBColorSpace に変わった。
  // SRGBColorSpace だとシェーダーのリニアカラーにガンマ補正がかかり白靄・白発光が生じる。
  // LinearSRGBColorSpace を明示してリニア出力を維持する（旧 LinearEncoding 相当）。
  (renderer as any).outputColorSpace = "srgb-linear";
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
  // タイルは RTT に入れると fadeMat による積算で想定より何倍も明るくなる。
  // 別シーンで RTT 出力後に描画することで積算を避ける。
  const tileScene = new THREE.Scene();


  // ─── 雨滴波紋 ────────────────────────────────────────────────────────────────
  // FORMED フェーズ中にランダム座標へ雨滴が落ちる衝撃をパーティクルへ与える。
  // 複数の波を同時管理するため配列で持ち、毎フレーム強度を減衰して自然な広がりを表現する。
  type Raindrop = { x: number; y: number; strength: number };
  let raindrops: Raindrop[]  = [];
  let nextRaindropTick       = 0; // 次スポーンを許可するティック

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
      // 最初の画像がロードされたらターゲットをアイコン形状に更新する。
      // FLYING フェーズ廃止により起動時は円ターゲットで開始しているため、
      // iconTargets.length の guard を外して必ず上書きする。
      if (i === 0) {
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
      sz:  0.35 + Math.random() * 0.25,
    };
  }

  // FLYING フェーズ廃止: 画像ロード前の暫定ターゲットとして円を使用。
  // createParticle() が iconTargets を参照するため、生成前に必ず設定する。
  iconTargets = buildCircleTargets();
  iconCycle   = 0;

  const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  // 生成直後に assignTargets() で全パーティクルへ円ターゲットを確実に割り当て
  assignTargets();

  // ─── 背景の星 ────────────────────────────────────────────────────────────────

  const bgStars = Array.from({ length: BG_STAR_COUNT }, () => {
    const x = (Math.random() - 0.5) * W * 1.3;
    const y = (Math.random() - 0.5) * H * 1.3;
    return {
      x, y,
      ox: x, oy: y,   // 元の位置（波紋後にスプリングで戻るための基準）
      vx: 0, vy: 0,   // 波紋による速度
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
      // uPhaseT: -1.0=FLYING（不可視）, 0.0→1.0=GATHERING遷移, 2.0=FORMED, 2.0→1.0=DISPERSING遷移
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

        // 奥行きによるサイズ補正（HiDPI 対応）
        float depth = 1.0 + position.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
        vAlpha = aAlpha;
      }
    `,
    fragmentShader: `
      uniform float uPhaseT;
      varying float vAlpha;

      void main() {
        // FLYING フェーズは uPhaseT=-1 で渡される → パーティクル不可視
        if (uPhaseT < 0.0) discard;
        // 個別 alpha が 0 に近い場合は描画スキップ（GATHERING 中の遠距離パーティクル）
        if (vAlpha < 0.01) discard;

        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        // フェーズ別カラー定義（サイトのアクセントカラー #00e5ff に調和する碧・翠系）
        vec3 jade    = vec3(0.20, 1.00, 0.65); // GATHERING：翠 #33ffa6
        vec3 emerald = vec3(0.00, 1.00, 0.55); // FORMED センター：エメラルド #00ff8c

        vec3  col;
        float alpha;

        if (uPhaseT >= 2.0) {
          // FORMED：エメラルドセンター、翠エッジ
          col   = r < 0.22 ? emerald : jade;
          alpha = r < 0.22 ? 1.00 : 0.95;
        } else {
          // GATHERING：目標に近いものだけ表示（vAlpha で距離フェードイン）
          col   = jade;
          alpha = 0.95;
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
      uDPR: { value: DPR },
    },
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
  // クリック位置へ拡大リングをスポーンするエフェクト。
  // 単位円（半径1）をスケールで拡大し、opacity を 0.55 → 0 にフェードさせる。
  // 最大 8 個を事前確保してリサイクルすることで GC 負荷を抑える。

  const RIPPLE_SEGS = 48;
  const RIPPLE_MAX  = 8;

  // 単位円の頂点（半径 1、z=0）。全リングで共有する読み取り専用ベース。
  const _ringBase = new Float32Array(RIPPLE_SEGS * 3);
  for (let i = 0; i < RIPPLE_SEGS; i++) {
    const a = (i / RIPPLE_SEGS) * Math.PI * 2;
    _ringBase[i * 3]     = Math.cos(a);
    _ringBase[i * 3 + 1] = Math.sin(a);
    _ringBase[i * 3 + 2] = 0;
  }

  interface RippleRing {
    mesh:   THREE.LineLoop;
    mat:    THREE.LineBasicMaterial;
    r:      number;   // 現在の半径（px）
    maxR:   number;   // 最終半径
    active: boolean;
  }

  const rippleRings: RippleRing[] = Array.from({ length: RIPPLE_MAX }, () => {
    const geo  = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(_ringBase.slice(), 3));
    const mat  = new THREE.LineBasicMaterial({
      color:       new THREE.Color(0x33ffa6), // jade
      transparent: true,
      opacity:     0,
      blending:    THREE.AdditiveBlending, // 加算合成でアイコンを絶対に隠さない
      depthTest:   false,
      depthWrite:  false,
    });
    const mesh = new THREE.LineLoop(geo, mat);
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, mat, r: 0, maxR: 100, active: false };
  });


  /** 指定ワールド座標にリングをスポーンする（プール空きがなければスキップ） */
  function spawnRipple(worldX: number, worldY: number) {
    const free = rippleRings.find(r => !r.active);
    if (!free) return;
    free.r    = 0;
    free.maxR = 60 + Math.random() * 80;
    free.mesh.position.set(worldX, worldY, 20);
    free.mesh.visible = true;
    free.active       = true;
  }

  // クリック位置（スクリーン座標 → ワールド座標変換）でリングをスポーン
  const onRippleClick = (e: MouseEvent) => {
    const wx = e.clientX - W / 2;
    const wy = H / 2 - e.clientY;
    spawnRipple(wx, wy);
  };
  window.addEventListener("click", onRippleClick, { passive: true });

  // ─── タイルフリップ ───────────────────────────────────────────────────────────
  // 全画面をタイルグリッドで覆い、左上から波状にカードフリップするアニメーション。
  // 裏面にバイナリ海に浮かぶアスタリスク（＊）のピクセルアートを表示。
  // InstancedMesh + カスタムシェーダーで全タイルを 1 描画コールで処理する。

  const TILE_SIZE  = Math.round(Math.min(W, H) / 28);
  const TILE_COLS  = Math.ceil(W / TILE_SIZE) + 1;
  const TILE_ROWS  = Math.ceil(H / TILE_SIZE) + 1;
  const TILE_COUNT = TILE_COLS * TILE_ROWS;

  // ＊の形: 水平・垂直・45° 対角線の交差（Chebyshev 距離で半径制限）
  // 小さめの半径で動的に移動するアスタリスクを表現する
  const AST_RADIUS = Math.max(3, Math.floor(Math.min(TILE_COLS, TILE_ROWS) * 0.12));
  let astCenterCol = Math.floor(TILE_COLS / 2);
  let astCenterRow = Math.floor(TILE_ROWS / 2);
  let astPhaseT    = 0; // ドリフト位相（毎サイクル加算）

  // per-instance バッファ
  const tileFlipAngles = new Float32Array(TILE_COUNT); // 各タイルの現在角度 (0→π)
  const tileDelays     = new Float32Array(TILE_COUNT); // 波の遅延（中心=0, 外周=1）
  const tileIsAsterisk = new Float32Array(TILE_COUNT);
  const tileAlphas     = new Float32Array(TILE_COUNT);
  const tileIdxArr     = new Float32Array(TILE_COUNT);

  // tileIdxArr はシェーダーのハッシュ用で不変
  for (let i = 0; i < TILE_COUNT; i++) tileIdxArr[i] = i;

  // アスタリスク中心を更新し関連バッファを再計算する。
  // 毎フリップサイクルの開始時に呼び出し、毎回異なる位置に ＊ を表示する。
  function refreshAsterisk(newCol: number, newRow: number) {
    // グリッド端からはみ出さないようクランプ
    astCenterCol = Math.max(AST_RADIUS, Math.min(TILE_COLS - 1 - AST_RADIUS, newCol));
    astCenterRow = Math.max(AST_RADIUS, Math.min(TILE_ROWS - 1 - AST_RADIUS, newRow));
    const maxDist = Math.sqrt(TILE_COLS ** 2 + TILE_ROWS ** 2);
    for (let row = 0; row < TILE_ROWS; row++) {
      for (let col = 0; col < TILE_COLS; col++) {
        const i  = row * TILE_COLS + col;
        const dx = col - astCenterCol;
        const dy = row - astCenterRow;
        // ＊ 判定: 水平・垂直・45° 対角の交差
        const isAst = Math.max(Math.abs(dx), Math.abs(dy)) <= AST_RADIUS &&
                      (dy === 0 || dx === 0 || Math.abs(dx) === Math.abs(dy));
        tileIsAsterisk[i] = isAst ? 1.0 : 0.0;
        // 波の遅延: アスタリスク中心からの距離ベース（中心=0 → 外周=1 の放射波）
        tileDelays[i] = Math.sqrt(dx * dx + dy * dy) / maxDist;
        // 全タイル均一 alpha（パーティクルエリアも含めて表示する）
        tileAlphas[i] = 0.56;
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
      varying   float vCosA;    // fragment でフェード計算するために渡す
      varying   float vTileIdx;

      void main() {
        // ローカル Y 軸周りにフリップ（PlaneGeometry の x 方向を回転）
        float cosA   = cos(aFlipAngle);
        float sinA   = sin(aFlipAngle);
        vec3  pos    = vec3(position.x * cosA, position.y, -position.x * sinA);
        gl_Position  = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
        vIsAsterisk  = aIsAsterisk;
        vAlpha       = aAlpha;
        vCosA        = cosA;
        vTileIdx     = aTileIdx;
      }
    `,
    fragmentShader: `
      varying float vIsAsterisk;
      varying float vAlpha;
      varying float vCosA;
      varying float vTileIdx;

      void main() {
        // cosA > 0 → 表面。1 - smoothstep(lo, hi, x) で 90° 付近をなめらかにフェード。
        // edge0 < edge1 を守らないと GLSL 未定義動作でちらつきの原因になる。
        float faceMask = 1.0 - smoothstep(-0.12, 0.0, vCosA); // cosA<-0.12→1, cosA>0→0
        if (faceMask < 0.01) discard;

        float alpha;
        vec3  col;
        if (vIsAsterisk > 0.5) {
          // アスタリスクタイル：明るいシアン白で発光感を演出（AdditiveBlending で自然にグロー）
          col   = vec3(0.75, 0.97, 1.0);
          alpha = 0.55 * vAlpha * faceMask;
        } else {
          // バイナリ風：インデックスをハッシュして 0/1 の濃淡（jade グリーン）
          col         = vec3(0.20, 1.00, 0.65);
          float h     = fract(sin(vTileIdx * 127.1 + 43.0) * 43758.5);
          alpha       = (h > 0.5 ? 0.20 : 0.08) * vAlpha * faceMask;
        }
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending:    THREE.AdditiveBlending,
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
      _tMat4.setPosition(wx, wy, -80); // bgStars より奥
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

  // アスタリスクの有効 col 範囲を左背景エリアに制限する。
  // icon エリア（右側）にドリフトするとパーティクルに埋もれて ＊ が見えなくなるため。
  // 腕の長さ（AST_RADIUS + 2 タイル余裕）分だけ境界手前を上限とする。
  const _iconLeft     = ICON_OFFSET_X - ICON_SIZE * 0.5;
  const astColMax     = Math.max(AST_RADIUS + 1,
    Math.floor((_iconLeft - TILE_SIZE * (AST_RADIUS + 2) + W / 2) / TILE_SIZE));
  const astColMin     = AST_RADIUS + 1;
  const astColMid     = (astColMax + astColMin) / 2;
  const astColAmp     = (astColMax - astColMin) / 2;

  // 初回配置（左背景エリアの中央に配置）
  refreshAsterisk(Math.floor(astColMid), Math.floor(TILE_ROWS / 2));

  // バイナリ四角は常時表示。全タイルを π（裏面）で初期化し、
  // WAVE_IN のタイミングでアスタリスクタイルのみ 0 → π にアニメーションさせる。
  tileFlipAngles.fill(Math.PI);
  tileFlipAttr.needsUpdate = true;

  // フリップアニメーション状態管理（HOLD ↔ WAVE_IN の 2 フェーズ）
  // string 型にすることで TypeScript の過剰な narrowing を防ぐ
  let tileAnimPhase = "HOLD";
  let tileAnimTimer = 0;
  const T_WAVE   = 70;  // 波が端まで伝わるフレーム数（約 1.2 秒）
  const T_SINGLE = 18;  // 1 枚が π まで回転するフレーム数
  const T_HOLD   = 150; // アスタリスク表示の保持フレーム数（約 2.5 秒）

  // ─── フェーズ管理 ────────────────────────────────────────────────────────────

  // FLYING フェーズをスキップして GATHERING から開始する。
  // FLYING（不可視 2 秒）は LoginOverlay を持たないページで
  // パーティクルが見えない原因になるため廃止。
  // DISPERSING → GATHERING のループ設計上、FLYING は二度と踏まない。
  let phaseIndex = PHASES.indexOf("GATHERING");
  let phaseTimer = 0;
  let phase      = "GATHERING";

  /** フェーズを次へ進め、必要な状態リセットを行う */
  function advancePhase() {
    // FLYING 開始時にアイコンがなければ円を使用（FLYING を再度踏む場合の保険）
    if (phase === "FLYING" && iconTargets.length === 0) {
      iconTargets = buildCircleTargets();
      iconCycle   = 0;
      assignTargets();
    }

    // FORMED → DISPERSING（爆散）→ GATHERING（次アイコン）の順で遷移。
    // DISPERSING 後は FLYING をスキップして直接 GATHERING へ進む。
    if (phase === "DISPERSING") {
      phaseIndex = PHASES.indexOf("GATHERING");
    } else {
      phaseIndex = (phaseIndex + 1) % PHASES.length;
    }
    if (phase === "FORMED") {
      raindrops = []; // フェーズ切り替え時に残存波紋をクリア
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
      // FLYING フェーズへの保険コード（現在は到達しないが、設計変更時のために残す）
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
    // FLYING は不可視フェーズ。ランダム飛散させず、静かにターゲットへ収束させておく。
    // 画像ロードが完了すると assignTargets() でターゲットが更新されるため、
    // 120 フレーム後に GATHERING 開始時にはパーティクルがほぼ所定位置に到達している。
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

    // 螺旋成分：目標方向に垂直な速度を加え銀河の腕のような軌跡を生む。
    // progress が増すにつれ螺旋が消えて収束する。
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

    // 固有位相：tx/ty から決まる定数なのでパーティクルごとに異なる動きになる
    const ownPhase = (p.tx * 0.07 + p.ty * 0.05) % (Math.PI * 2);

    // 脈動：目標方向への速度を sin で揺らす
    const pulse = Math.sin(currentTick * 0.04 + ownPhase) * 0.8;

    // ダンプを 0.25 → 0.18 に緩めることで、GATHERING 終了直後に
    // 速度がピタッと止まるのを防ぐ。見た目の動き量は元とほぼ同じ。
    // 極小のドリフト力で完全静止しない程度の揺らぎを持続させる。
    const driftAngle = currentTick * 0.008 + ownPhase;
    const driftX = Math.cos(driftAngle) * 0.02;
    const driftY = Math.sin(driftAngle) * 0.02;

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

  // colorT: 0=シアン, 1=翠（jade #33ffa6）（GATHERING→DISPERSING のフェーズ進行に連動）
  function writeTrail(p: Particle, i: number, velocity: number, colorT: number) {
    const TRAIL_LENGTH_SCALE = 2.2;
    const TRAIL_MAX_LENGTH   = 36;
    const trailLen = Math.min(velocity * TRAIL_LENGTH_SCALE, TRAIL_MAX_LENGTH);
    const invVel   = velocity || 1;
    const nx = p.vx / invVel;
    const ny = p.vy / invVel;
    const nz = p.vz / invVel;

    // 始点（テール側）：シアン→翠をブレンド
    const tr = 0.20 * colorT;
    const tg = 0.9  + 0.10 * colorT;
    const tb = 1.0  - 0.35 * colorT;
    trailPosArr[i * 6]     = p.x - nx * trailLen;
    trailPosArr[i * 6 + 1] = p.y - ny * trailLen;
    trailPosArr[i * 6 + 2] = p.z - nz * trailLen;
    trailColArr[i * 6]     = tr; trailColArr[i * 6 + 1] = tg; trailColArr[i * 6 + 2] = tb;
    trailAlpArr[i * 2]     = 0;

    // 終点（ヘッド側：不透明・白）
    trailPosArr[i * 6 + 3] = p.x;
    trailPosArr[i * 6 + 4] = p.y;
    trailPosArr[i * 6 + 5] = p.z;
    trailColArr[i * 6 + 3] = 1.0; trailColArr[i * 6 + 4] = 1.0; trailColArr[i * 6 + 5] = 1.0;
    trailAlpArr[i * 2 + 1] = 0.82;
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

    // フェーズ開始直後（1フレーム目）は RTT をクリアしてトレイル残像をリセット。
    // FORMED: GATHERING の螺旋トレイル積算をリセット
    // DISPERSING: FORMED の静止トレイル積算をリセット（矩形残像の再出現を防ぐ）
    if ((phase === "FORMED" || phase === "DISPERSING") && phaseTimer === 1) {
      renderer.setRenderTarget(rtA); renderer.clear();
      renderer.setRenderTarget(rtB); renderer.clear();
      renderer.setRenderTarget(null);
    }
    // GATHERING 中はフェードを速くしてトレイルが積算されすぎるのを防ぐ。
    // GATHERING は積算を抑制、DISPERSING は爆散トレイルを残す、FORMED は静止で短く
    fadeMat.opacity = phase === "GATHERING" ? 0.28 : phase === "DISPERSING" ? 0.22 : 0.12;

    // カメラは固定（マウス視差なし）
    camera.position.x = 0;
    camera.position.y = 0;

    // ユニフォーム更新
    // uPhaseT: FLYING=-1（不可視）, GATHERING=0→1, FORMED=2, DISPERSING=2→1（逆進）
    // FLYING は散布状態を見せないため -1 を渡し fragment shader 側で discard する。
    const uPhaseT =
      phase === "FORMED"     ? 2.0 :
      phase === "GATHERING"  ? progress :
      phase === "DISPERSING" ? 2.0 - progress :
      /* FLYING */             -1.0;
    (particleMat.uniforms.uPhaseT as { value: number }).value = uPhaseT;

    // 背景星のゆらぎ更新 + 波紋スプリング
    bgStars.forEach((star, i) => {
      // 波紋で動いた分を元の位置へ引き戻すスプリング力
      star.vx += (star.ox - star.x) * 0.02;
      star.vy += (star.oy - star.y) * 0.02;
      star.vx *= 0.88;
      star.vy *= 0.88;
      star.x  += star.vx;
      star.y  += star.vy;

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

    // ─── 波紋リング更新（クリックトリガーのみ）──────────────────────────────────
    rippleRings.forEach(ring => {
      if (!ring.active) return;
      ring.r += 0.9;
      const t          = ring.r / ring.maxR;          // 0→1（進捗）
      ring.mat.opacity = 0.55 * Math.pow(1 - t, 1.5); // ease-out フェード
      ring.mesh.scale.setScalar(ring.r);
      if (ring.r >= ring.maxR) {
        ring.active       = false;
        ring.mesh.visible = false;
        ring.mat.opacity  = 0;
      }
    });

    // ─── タイルフリップ更新 ──────────────────────────────────────────────────────
    tileAnimTimer++;
    // TS の過剰 narrowing を防ぐためスナップショットを使用
    const _tp = tileAnimPhase;

    if (_tp === "HOLD" && tileAnimTimer > T_HOLD) {
      // アスタリスクを Lissajous 軌跡でドリフト（左背景エリア内に制限）
      astPhaseT += 0.8;
      const newCol = Math.floor(astColMid + Math.sin(astPhaseT)       * astColAmp);
      const newRow = Math.floor(TILE_ROWS / 2 + Math.cos(astPhaseT * 0.7) * TILE_ROWS * 0.3);
      refreshAsterisk(newCol, newRow);
      // 新しいアスタリスクタイルを 0 にリセット（WAVE_IN でフリップイン）
      // 非アスタリスクタイルは常時 π（バイナリ常時表示）
      for (let i = 0; i < TILE_COUNT; i++) {
        tileFlipAngles[i] = tileIsAsterisk[i] > 0.5 ? 0 : Math.PI;
      }
      tileFlipAttr.needsUpdate = true;
      tileAnimPhase = "WAVE_IN"; tileAnimTimer = 0;
    }
    else if (_tp === "WAVE_IN" && tileAnimTimer > T_WAVE + T_SINGLE) {
      tileAnimPhase = "HOLD"; tileAnimTimer = 0;
    }

    // WAVE_IN 中はアスタリスクタイルのみ 0 → π にアニメーション
    // 非アスタリスクタイルは π のまま（毎フレーム書き直さない）
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

    // ─── 雨滴スポーン（FORMED フェーズのみ）────────────────────────────────────
    // 300〜600ms ランダム間隔で画面全体のランダム座標へ雨滴を落とす。
    // bgStars（背景星）に衝撃を与えるので、アイコン領域除外は不要。
    if (phase === "FORMED" && tick >= nextRaindropTick && raindrops.length < 5) {
      raindrops.push({
        x:        (Math.random() - 0.5) * W,
        y:        (Math.random() - 0.5) * H,
        strength: 0.8 + Math.random() * 0.7,
      });
      // 次スポーンまで 300〜600ms（60fps 換算: 18〜36 tick）
      nextRaindropTick = tick + 18 + Math.floor(Math.random() * 18);
    }

    // ─── 雨滴の物理を bgStars へ適用＋減衰 ──────────────────────────────────
    // アイコンパーティクルはノータッチ。bgStars（背景星）だけに衝撃を与えることで
    // 水面に雨が落ちるような波紋を表現する。
    // wd は OrthographicCamera のためスクリーンピクセル単位。
    // 力を大きくしないと星が小さく見た目に変化が出ないため * 40 で増幅。
    if (raindrops.length > 0) {
      bgStars.forEach(star => {
        raindrops.forEach(drop => {
          const wx    = star.x - drop.x;
          const wy    = star.y - drop.y;
          const wd    = Math.hypot(wx, wy) || 1;
          // 近距離での爆発的な力を抑えるため上限 5 でクランプ
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

    // パーティクル物理演算 + バッファ書き込み
    const showTrails = phase === "GATHERING" || phase === "DISPERSING";
    const MIN_TRAIL_VELOCITY = 1.5;

    particles.forEach((p, i) => {
      if      (phase === "FLYING")     updateParticleFlying(p);
      else if (phase === "GATHERING")  updateParticleGathering(p, progress);
      else if (phase === "FORMED")     updateParticleFormed(p, tick);
      else                             updateParticleDispersing(p, progress);

      // 位置・サイズをバッファに書き込み
      const velocity = Math.hypot(p.vx, p.vy);
      particlePosArr[i * 3]     = p.x;
      particlePosArr[i * 3 + 1] = p.y;
      particlePosArr[i * 3 + 2] = p.z;
      // フェーズ問わず均一サイズ。velocity ボーナスは視覚的にアンバランスになるため除去。
      particleSizeArr[i] = p.sz * 4.3;

      // GATHERING 中：序盤は目標基準（初回ランダム配置の散乱を防ぐ）、
      // 終盤は中心円基準（丸型演出）へ progress に応じてブレンド。
      let particleVisible = true;
      if (phase === "GATHERING") {
        // 目標地点への近さ（初期散乱防止用）。
        // progress が上がるにつれ影響をゼロに絞り、終盤は circle のみで判定する。
        // これにより FORMING 終了時に矩形エッジが circle 外に確実に収まる。
        const tdx        = p.x - p.tx;
        const tdy        = p.y - p.ty;
        const distToTgt  = Math.sqrt(tdx * tdx + tdy * tdy);
        const tgtWeight  = Math.max(0, 1 - progress * 1.5); // progress >= 0.67 でゼロ
        const alphaByTgt = Math.min(1, Math.max(0, 1 - distToTgt / (ICON_SIZE * 0.2))) * tgtWeight;
        // 中心円（progress に応じて徐々に拡大）。
        // 半径を ICON_SIZE * 0.48（< 画像半辺の 0.5）にすることで
        // 画像の上下左右端に並ぶ矩形エッジパーティクルをマスク外に追い出す。
        const cdx           = p.x - ICON_OFFSET_X;
        const cdy           = p.y;
        const distToCenter  = Math.sqrt(cdx * cdx + cdy * cdy);
        const circleRadius  = ICON_SIZE * 0.48 * progress; // 序盤は 0、終盤フル円
        const alphaByCircle = Math.min(1, Math.max(0, (circleRadius - distToCenter) / (ICON_SIZE * 0.06)));
        particleAlphaArr[i] = Math.max(alphaByTgt, alphaByCircle);
        particleVisible = particleAlphaArr[i] > 0.01;
      } else if (phase === "FORMED") {
        // FORMED も GATHERING 終了と同じ中心円でクリップ（シームレスな移行＋丸型維持）。
        // 0.48 < 0.5（半辺）なので上下左右端が確実に円外に出る。
        const cdx          = p.x - ICON_OFFSET_X;
        const cdy          = p.y;
        const distToCenter = Math.sqrt(cdx * cdx + cdy * cdy);
        particleAlphaArr[i] = Math.min(1, Math.max(0, (ICON_SIZE * 0.48 - distToCenter) / (ICON_SIZE * 0.06)));
        particleVisible = particleAlphaArr[i] > 0.01;
      } else if (phase === "DISPERSING") {
        // 序盤は FORMED の円形マスクを継続し、矩形パーティクルの瞬間再出現を防ぐ。
        // progress が進むにつれパーティクルが外側へ飛び出し、マスクを自然に抜けていく。
        const cdx = p.x - ICON_OFFSET_X;
        const cdy = p.y;
        const distToCenter = Math.sqrt(cdx * cdx + cdy * cdy);
        const circleAlpha = Math.min(1, Math.max(0, (ICON_SIZE * 0.48 - distToCenter) / (ICON_SIZE * 0.06)));
        // progress 0.2 までにマスクを解除（それ以降はパーティクルが十分広がっている）
        const maskWeight  = Math.max(0, 1 - progress * 5);
        const baseAlpha   = Math.max(circleAlpha * maskWeight, 1 - maskWeight);
        // 後半（progress > 0.7）でフェードアウト
        const fadeOut = progress < 0.7 ? 1.0 : Math.max(0, 1 - (progress - 0.7) / 0.3);
        particleAlphaArr[i] = baseAlpha * fadeOut;
        particleVisible = particleAlphaArr[i] > 0.01;
      } else {
        particleAlphaArr[i] = 1.0;
      }

      // トレイルの書き込み（速度が一定以上 かつ パーティクルが可視の場合のみ）
      // 遠距離パーティクルのトレイルが迷子の点として見えるのを防ぐ
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

    // 6. タイルを RTT 出力の上に描画（RTT 積算を避けつつパーティクルの前に乗せる）
    renderer.render(tileScene, camera);

    // 7. RT をスワップ（rtB が次フレームの「前フレーム」になる）
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

  // ページ離脱直前に暗色フレームを確定描画する。
  // preserveDrawingBuffer と組み合わせることで、F5/ナビゲーション後の白発光を防ぐ。
  const onPageHide = () => {
    renderer.setClearColor(new THREE.Color(0x181c2a), 1);
    renderer.setRenderTarget(null);
    renderer.clear();
  };
  window.addEventListener("pagehide", onPageHide);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize",    onResize);
    window.removeEventListener("click",     onRippleClick);
    window.removeEventListener("pagehide",  onPageHide);
    tileGeo.dispose();
    tileMat.dispose();
    rippleRings.forEach(ring => {
      scene.remove(ring.mesh);           // シーングラフから除去してから dispose
      ring.mesh.geometry.dispose();
      ring.mat.dispose();
    });
    // ヘルパーシーンのマテリアル解放
    quadGeo.dispose();
    blitMat.dispose();
    fadeMat.dispose();
    outMat.dispose();
    // RenderTarget はテクスチャも明示的に解放
    rtA.texture.dispose();
    rtB.texture.dispose();
    rtA.dispose();
    rtB.dispose();
    renderer.dispose();
    particleGeo.dispose();
    particleMat.dispose();
    trailGeo.dispose();
    trailMat.dispose();
    bgGeo.dispose();
    bgMat.dispose();
  };
}
