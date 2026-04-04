import type * as THREE_NS from "three";

// ─── 定数 ────────────────────────────────────────────────────────────────────

const MOBILE_BREAKPOINT  = 768;
const PETAL_COUNT_PC     = 800;
const PETAL_COUNT_MOBILE = 450;

const BG_BLOSSOM_COUNT = 20;
const BG_STAR_COUNT    = 80;

const SAKURA_COLORS = [0xFFB7C5, 0xFFC0CB, 0xFFD0DC, 0xFFE4EC, 0xFFF5F8];

const PHASE_DURATIONS = {
  FALLING:    220,
  GATHERING:  300,
  FORMED:     220,
  DISPERSING: 110,
} as const;

const PHASES = ["FALLING", "GATHERING", "FORMED", "DISPERSING"] as const;
type Phase = typeof PHASES[number];

// ─── 型 ──────────────────────────────────────────────────────────────────────

interface Petal {
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
  vrx: number; vrz: number;
  vy: number;
  phase: number;
  scale: number;
  tx: number; ty: number;
  dvx: number; dvy: number;
}

interface BgBlossom { rz: number; vrz: number; }

// ─── ヘルパー ─────────────────────────────────────────────────────────────────

/**
 * 月本体テクスチャ: ラジアルグラデーションで中心を明るく・端を透明にフェード。
 * 中心点をわずかにずらすことで平面的になりすぎない立体感を出す。
 */
function createMoonTexture(THREE: typeof THREE_NS): THREE_NS.CanvasTexture {
  const SIZE = 256;
  const cv   = document.createElement("canvas");
  cv.width   = cv.height = SIZE;
  const ctx  = cv.getContext("2d")!;

  // 内側の焦点を左上にずらして月面の明暗差を演出する
  const grad = ctx.createRadialGradient(
    SIZE * 0.42, SIZE * 0.40, SIZE * 0.04,
    SIZE * 0.50, SIZE * 0.50, SIZE * 0.50,
  );
  grad.addColorStop(0.00, "rgba(255, 255, 252, 1.00)");
  grad.addColorStop(0.30, "rgba(255, 253, 230, 1.00)");
  grad.addColorStop(0.62, "rgba(248, 242, 208, 0.98)");
  grad.addColorStop(0.85, "rgba(230, 218, 170, 0.70)");
  grad.addColorStop(1.00, "rgba(200, 185, 140, 0.00)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(cv);
}

/**
 * 月のグローテクスチャ: 大気圏の滲みを表現する柔らかい多段フェード。
 * PlaneGeometry に貼ることでハードエッジなしの自然な発光を実現する。
 */
function createMoonGlowTexture(THREE: typeof THREE_NS): THREE_NS.CanvasTexture {
  const SIZE = 512;
  const cv   = document.createElement("canvas");
  cv.width   = cv.height = SIZE;
  const ctx  = cv.getContext("2d")!;

  const grad = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE / 2);
  grad.addColorStop(0.00, "rgba(255, 248, 210, 0.28)");
  grad.addColorStop(0.18, "rgba(255, 248, 210, 0.18)");
  grad.addColorStop(0.40, "rgba(255, 248, 210, 0.08)");
  grad.addColorStop(0.65, "rgba(255, 248, 210, 0.03)");
  grad.addColorStop(1.00, "rgba(255, 248, 210, 0.00)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SIZE, SIZE);

  return new THREE.CanvasTexture(cv);
}

/**
 * 桜の1輪分（5枚花びら）の ShapeGeometry を返す。
 */
function createBlossomGeo(THREE: typeof THREE_NS): THREE_NS.ShapeGeometry {
  const shape = new THREE.Shape();
  const n     = 5;

  for (let i = 0; i < n; i++) {
    const tipAngle   = Math.PI / 2 + (i / n) * Math.PI * 2;
    const leftAngle  = tipAngle - Math.PI / n;
    const rightAngle = tipAngle + Math.PI / n;
    const lx = Math.cos(leftAngle)  * 0.22;
    const ly = Math.sin(leftAngle)  * 0.22;
    const rx = Math.cos(rightAngle) * 0.22;
    const ry = Math.sin(rightAngle) * 0.22;
    const tx = Math.cos(tipAngle)   * 1.0;
    const ty = Math.sin(tipAngle)   * 1.0;

    if (i === 0) shape.moveTo(lx, ly);
    shape.quadraticCurveTo(Math.cos(tipAngle - Math.PI / n * 0.60) * 1.25, Math.sin(tipAngle - Math.PI / n * 0.60) * 1.25, tx, ty);
    shape.quadraticCurveTo(Math.cos(tipAngle + Math.PI / n * 0.60) * 1.25, Math.sin(tipAngle + Math.PI / n * 0.60) * 1.25, rx, ry);
  }

  return new THREE.ShapeGeometry(shape, 16);
}

/**
 * 桜の木シルエットをオフスクリーンキャンバスに描き、非透明ピクセルを
 * ワールド座標のターゲット位置として返す。
 *
 * 幹 → 主枝 → 小枝 の順に stroke で描き、枝先に花冠（円）を重ねる。
 * 枝のストロークが候補ピクセルに含まれるため、収束時に枝のライン沿いに
 * 花びらが並び、単純な blob より木らしいシルエットになる。
 */
function generateTreeTargets(
  count: number,
  halfW: number,
  halfH: number,
): Array<{ x: number; y: number }> {
  const S   = 512;
  const cx  = S / 2;
  const cv  = document.createElement("canvas");
  cv.width  = S;
  cv.height = S;
  const ctx = cv.getContext("2d")!;

  ctx.clearRect(0, 0, S, S);
  ctx.lineCap  = "round";
  ctx.lineJoin = "round";

  // ── 枝を描く（stroke → 候補ピクセル化）────────────────────────────────
  ctx.strokeStyle = "#FFC8D8";

  // 幹
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(cx, S * 0.98);
  ctx.lineTo(cx, S * 0.58);
  ctx.stroke();

  // 主枝 左
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(cx, S * 0.64);
  ctx.quadraticCurveTo(cx - S * 0.10, S * 0.58, cx - S * 0.26, S * 0.46);
  ctx.stroke();

  // 主枝 右
  ctx.beginPath();
  ctx.moveTo(cx, S * 0.62);
  ctx.quadraticCurveTo(cx + S * 0.10, S * 0.56, cx + S * 0.28, S * 0.44);
  ctx.stroke();

  // 上枝 左
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(cx, S * 0.60);
  ctx.quadraticCurveTo(cx - S * 0.06, S * 0.50, cx - S * 0.14, S * 0.36);
  ctx.stroke();

  // 上枝 右
  ctx.beginPath();
  ctx.moveTo(cx, S * 0.60);
  ctx.quadraticCurveTo(cx + S * 0.06, S * 0.50, cx + S * 0.16, S * 0.34);
  ctx.stroke();

  // 小枝 左外
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx - S * 0.20, S * 0.52);
  ctx.quadraticCurveTo(cx - S * 0.28, S * 0.46, cx - S * 0.34, S * 0.36);
  ctx.stroke();

  // 小枝 右外
  ctx.beginPath();
  ctx.moveTo(cx + S * 0.22, S * 0.50);
  ctx.quadraticCurveTo(cx + S * 0.28, S * 0.44, cx + S * 0.35, S * 0.34);
  ctx.stroke();

  // ── 枝先の花冠（fill → 密集エリア）────────────────────────────────────
  const blob = (bx: number, by: number, r: number) => {
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
  };
  ctx.fillStyle = "#FFB7C5";

  blob(cx,               S * 0.26, S * 0.20);  // 頂点
  blob(cx - S * 0.14,    S * 0.30, S * 0.16);  // 左上
  blob(cx + S * 0.16,    S * 0.29, S * 0.16);  // 右上
  blob(cx - S * 0.28,    S * 0.38, S * 0.14);  // 左主枝先
  blob(cx + S * 0.30,    S * 0.36, S * 0.14);  // 右主枝先
  blob(cx - S * 0.36,    S * 0.30, S * 0.11);  // 左外枝先
  blob(cx + S * 0.37,    S * 0.28, S * 0.11);  // 右外枝先
  blob(cx,               S * 0.38, S * 0.13);  // 中央下め（密度補完）

  // ── サンプリング ──────────────────────────────────────────────────────
  const data       = ctx.getImageData(0, 0, S, S).data;
  const candidates: Array<{ x: number; y: number }> = [];
  for (let py = 0; py < S; py++) {
    for (let px = 0; px < S; px++) {
      if (data[(py * S + px) * 4 + 3] > 128) candidates.push({ x: px, y: py });
    }
  }

  const treeH  = halfH * 1.5;
  const treeW  = halfW * 1.2;
  const scaleX = treeW / S;
  const scaleY = treeH / S;

  return Array.from({ length: count }, () => {
    const c = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      x:  (c.x - S / 2) * scaleX,
      y: -(c.y - S / 2) * scaleY - halfH * 0.08,
    };
  });
}

// ─── エクスポート関数 ─────────────────────────────────────────────────────────

/**
 * Three.js による夜桜アニメーションを初期化する。
 *
 * 構成:
 *   - 月（PlaneGeometry + canvas グラデーションテクスチャ）
 *   - グロー（PlaneGeometry + 柔らかいグラデーションテクスチャ）
 *   - 星（Points）
 *   - 背景の桜の花（InstancedMesh, ゆっくり回転）
 *   - 落下花びら（InstancedMesh, 500枚）: FALLING→GATHERING→FORMED→DISPERSING ループ
 */
export function initSakura(
  canvas: HTMLCanvasElement,
  THREE: typeof THREE_NS,
  onFrame: (animationId: number) => void,
): () => void {
  const W   = window.innerWidth;
  const H   = window.innerHeight;
  const DPR = Math.min(window.devicePixelRatio, 2);
  const isMobile = W < MOBILE_BREAKPOINT;
  const COUNT    = isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_PC;

  // ── レンダラー ────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(DPR);
  renderer.setSize(W, H);
  renderer.setClearColor(0x181c2a, 1);

  // ── シーン・カメラ ────────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const fov    = 60;
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 100);
  camera.position.z = 20;

  const halfH = Math.tan((fov / 2) * (Math.PI / 180)) * camera.position.z;
  const halfW = halfH * (W / H);
  const yMax  = halfH  + 3;
  const yMin  = -halfH - 1;
  const xSpan = halfW  * 2.4;

  // ── 月 ───────────────────────────────────────────────────────────────────
  // CircleGeometry のハードエッジを避けるため PlaneGeometry + canvas テクスチャで描画する。
  // グロー面 → 月本体の順に z 値をずらして重ねる。
  const moonR   = isMobile ? 1.4 : 2.0;
  const moonPos = new THREE.Vector3(halfW * 0.55, halfH * 0.62, -2);

  const glowTex = createMoonGlowTexture(THREE);
  const glowGeo = new THREE.PlaneGeometry(moonR * 8, moonR * 8);
  const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false });
  const glow    = new THREE.Mesh(glowGeo, glowMat);
  glow.position.copy(moonPos).setZ(moonPos.z - 0.5);
  scene.add(glow);

  const moonTex = createMoonTexture(THREE);
  const moonGeo = new THREE.PlaneGeometry(moonR * 2, moonR * 2);
  const moonMat = new THREE.MeshBasicMaterial({ map: moonTex, transparent: true, depthWrite: false });
  const moon    = new THREE.Mesh(moonGeo, moonMat);
  moon.position.copy(moonPos);
  scene.add(moon);

  // ── 星 ───────────────────────────────────────────────────────────────────
  const starPositions = new Float32Array(BG_STAR_COUNT * 3);
  for (let i = 0; i < BG_STAR_COUNT; i++) {
    starPositions[i * 3]     = (Math.random() - 0.5) * halfW * 2.4;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * halfH * 2.2;
    starPositions[i * 3 + 2] = -10 - Math.random() * 8;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.55 });
  scene.add(new THREE.Points(starGeo, starMat));

  // ── 背景の桜の花（🌸） ────────────────────────────────────────────────────
  const blossomGeo  = createBlossomGeo(THREE);
  const blossomMat  = new THREE.MeshBasicMaterial({ color: 0xFFB7C5, transparent: true, opacity: 0.14, side: THREE.DoubleSide });
  const blossomMesh = new THREE.InstancedMesh(blossomGeo, blossomMat, BG_BLOSSOM_COUNT);
  scene.add(blossomMesh);

  const bgBlossoms: BgBlossom[] = [];
  const bgDummy = new THREE.Object3D();

  for (let i = 0; i < BG_BLOSSOM_COUNT; i++) {
    // 以前は 2.5〜7.5 で大きすぎたため 0.8〜2.6 に縮小して背景感を出す
    const scale = 0.8 + Math.random() * 1.8;
    const rz    = Math.random() * Math.PI * 2;
    bgBlossoms.push({ rz, vrz: (Math.random() - 0.5) * 0.003 });

    bgDummy.position.set(
      (Math.random() - 0.5) * halfW * 2.2,
      (Math.random() - 0.5) * halfH * 2.2,
      -10 - Math.random() * 8,
    );
    bgDummy.rotation.z = rz;
    bgDummy.scale.setScalar(scale);
    bgDummy.updateMatrix();
    blossomMesh.setMatrixAt(i, bgDummy.matrix);
  }
  blossomMesh.instanceMatrix.needsUpdate = true;

  // ── 木のターゲット座標 ────────────────────────────────────────────────────
  const treeTargets = generateTreeTargets(COUNT, halfW, halfH);

  // ── 落下花びら ────────────────────────────────────────────────────────────
  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.bezierCurveTo( 0.55, 0.15,  0.70,  0.95, 0, 1.35);
  petalShape.bezierCurveTo(-0.70, 0.95, -0.55,  0.15, 0, 0);
  const petalGeo  = new THREE.ShapeGeometry(petalShape, 8);
  const petalMat  = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.88 });
  const petalMesh = new THREE.InstancedMesh(petalGeo, petalMat, COUNT);
  petalMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(COUNT * 3), 3);
  scene.add(petalMesh);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const petals: Petal[] = Array.from({ length: COUNT }, (_, i) => {
    const scale = 0.18 + Math.random() * 0.28;
    const tgt   = treeTargets[i];
    return {
      x: (Math.random() - 0.5) * xSpan, y: (Math.random() - 0.5) * halfH * 2, z: (Math.random() - 0.5) * 7,
      rx: Math.random() * Math.PI * 2,   ry: Math.random() * Math.PI * 2,       rz: Math.random() * Math.PI * 2,
      vrx: (Math.random() - 0.5) * 0.018, vrz: (Math.random() - 0.5) * 0.025,
      vy: 0.012 + Math.random() * 0.018, phase: Math.random() * Math.PI * 2, scale,
      tx: tgt.x, ty: tgt.y, dvx: 0, dvy: 0,
    };
  });

  petals.forEach((_, i) => {
    color.setHex(SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)]);
    petalMesh.setColorAt(i, color);
  });
  if (petalMesh.instanceColor) petalMesh.instanceColor.needsUpdate = true;

  // ── フェーズ管理 ──────────────────────────────────────────────────────────
  let phase: Phase = "FALLING";
  let phaseFrame   = 0;

  function nextPhase() {
    phase      = PHASES[(PHASES.indexOf(phase) + 1) % PHASES.length];
    phaseFrame = 0;
    if (phase === "DISPERSING") {
      petals.forEach((p) => {
        const dx = p.x, dy = p.y - (-halfH * 0.08);
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const spd = 0.15 + Math.random() * 0.25;
        p.dvx = (dx / len) * spd + (Math.random() - 0.5) * 0.1;
        p.dvy = (dy / len) * spd + Math.random() * 0.08;
      });
    }
  }

  // （花吹雪はランダム発動ではなく常時風として FALLING ループ内で処理する）

  // ── アニメーションループ ──────────────────────────────────────────────────
  let t = 0, rafId = 0;

  function animate() {
    rafId = requestAnimationFrame(animate);
    onFrame(rafId);
    t += 0.016;
    phaseFrame++;
    if (phaseFrame >= PHASE_DURATIONS[phase]) nextPhase();

    // 常時花吹雪: ゆっくり方向が変わるサイン波で全体に風を流す
    // 周期が異なる2波を合成することで規則的すぎない自然な風になる
    const windX = Math.sin(t * 0.07) * 0.10 + Math.sin(t * 0.13) * 0.05;

    for (let i = 0; i < BG_BLOSSOM_COUNT; i++) {
      const b = bgBlossoms[i];
      b.rz += b.vrz;
      blossomMesh.getMatrixAt(i, bgDummy.matrix);
      bgDummy.matrix.decompose(bgDummy.position, bgDummy.quaternion, bgDummy.scale);
      bgDummy.rotation.z = b.rz;
      bgDummy.updateMatrix();
      blossomMesh.setMatrixAt(i, bgDummy.matrix);
    }
    blossomMesh.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < COUNT; i++) {
      const p = petals[i];
      if (phase === "FALLING") {
        p.y -= p.vy;
        p.x += windX + Math.sin(t * 0.4 + p.phase) * 0.018; // 常時風 + 個別揺れ
        p.rx += p.vrx; p.rz += p.vrz;
        p.ry += Math.cos(t * 0.6 + p.phase) * 0.012;
        if (p.y < yMin) { p.y = yMax + Math.random() * 3; p.x = (Math.random() - 0.5) * xSpan; }
      } else if (phase === "GATHERING") {
        p.x += (p.tx - p.x) * 0.035; p.y += (p.ty - p.y) * 0.035; p.z += (0 - p.z) * 0.05;
        p.rx += p.vrx * 0.4; p.rz += p.vrz * 0.4;
      } else if (phase === "FORMED") {
        p.x = p.tx + Math.sin(t * 1.2 + p.phase) * 0.06;
        p.y = p.ty + Math.cos(t * 0.9 + p.phase * 0.8) * 0.06;
        p.rx += p.vrx * 0.05; p.rz += p.vrz * 0.05;
      } else if (phase === "DISPERSING") {
        p.x += p.dvx; p.y += p.dvy; p.dvy -= 0.004;
        p.rx += p.vrx; p.rz += p.vrz;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      petalMesh.setMatrixAt(i, dummy.matrix);
    }
    petalMesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }

  animate();

  // ── リサイズ対応 ──────────────────────────────────────────────────────────
  function onResize() {
    const nW = window.innerWidth, nH = window.innerHeight;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  }
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
    petalGeo.dispose();   petalMat.dispose();
    blossomGeo.dispose(); blossomMat.dispose();
    moonGeo.dispose();    moonMat.dispose();    moonTex.dispose();
    glowGeo.dispose();    glowMat.dispose();    glowTex.dispose();
    starGeo.dispose();    starMat.dispose();
  };
}
