import { useEffect, useRef, useState } from "react";

const SSH_CMD      = "$ ssh asteriskx@portfolio";
/** パスワード入力ドットの表示数 */
const DOTS         = 8;
/** 認証プログレスバーの総ステップ数 */
const BAR_TOTAL    = 20;
/** 起動プログレスバーの総ステップ数 */
const LAUNCH_TOTAL = 20;

/** figlet "Standard" フォントで生成した ASTERISKX アスキーアート（npx figlet -f Standard） */
const WELCOME_BANNER = [
  "                                                       ",
  "     _    ____ _____ _____ ____  ___ ____  _  ____  __",
  "    / \\  / ___|_   _| ____|  _ \\|_ _/ ___|| |/ /\\ \\/ /",
  "   / _ \\ \\___ \\ | | |  _| | |_) || |\\___ \\| ' /  \\  / ",
  "  / ___ \\ ___) || | | |___|  _ < | | ___) | . \\  /  \\ ",
  " /_/   \\_\\____/ |_| |_____|_| \\_\\___|____/|_|\\_\\/_/\\_\\",
];

/** figlet "Standard" フォントで生成した .NET アスキーアート（npx figlet -f Standard） */
const NET_BANNER = [
  "                      ",
  "    _   _ _____ _____ ",
  "   | \\ | | ____|_   _|",
  "   |  \\| |  _|   | |  ",
  "  _| |\\  | |___  | |  ",
  " (_)_| \\_|_____| |_|  ",
];

/** ASTERISKX と .net を横並びに結合したフルバナー */
const FULL_BANNER = WELCOME_BANNER.map((line, i) => line + (NET_BANNER[i] ?? ""));

/** ASCII アートの横幅（文字数）。W:H = 文字高:文字幅 の比率に合わせて縦横比を保持する */
const AA_W = 128;
/** ASCII アートの縦幅（行数） */
const AA_H = 48;
/** ASCII アートの文字セット（暗い→明るい順の5階調） */
const AA_CHARS = " ░▒▓█";

const FALLBACK_ART: string[] = Array(AA_H).fill(" ".repeat(AA_W));

const SYSINFO = [
  { label: "",       value: "asteriskx@portfolio",    cls: "lo-nf-user" },
  { label: "",       value: "─────────────────────",  cls: "lo-nf-sep"  },
  { label: "OS    ", value: "asteriskx.net"                             },
  { label: "Stack ", value: "Three.js / React Router v7"                },
  { label: "Host  ", value: "GitHub Pages"                              },
  { label: "Shell ", value: "bash"                                      },
  { label: "Uptime", value: "since 2018"                                },
  { label: "",       value: ""                                          },
  { label: "",       value: "● ● ● ● ● ● ● ● ●",      cls: "lo-nf-pal"  },
];

/**
 * ログインアニメーションのフェーズ識別子。
 * `PHASE_ORDER` に定義された順序で遷移する:
 * ssh → connected → login → password → auth → granted → welcome → neofetch → fading
 */
type Phase =
  | "ssh" | "connected" | "login" | "password"
  | "auth" | "granted" | "welcome"
  | "neofetch" | "fading";

const PHASE_ORDER: Phase[] = [
  "ssh", "connected", "login", "password",
  "auth", "granted", "welcome", "neofetch", "fading",
];

interface Props { onDone: () => void; }

/**
 * 画像を ASCII アート（5階調）に変換する非同期関数。
 * Canvas 2D で画像を描画後、各セルの平均輝度（RGB 重み付き: R×0.299 / G×0.587 / B×0.114）を計算し
 * {@link AA_CHARS} の対応文字にマッピングする。
 * 変換に失敗した場合は {@link FALLBACK_ART}（空白行の配列）を返す。
 * @param src 変換元の画像 URL
 * @param w ASCII アートの横幅（文字数）
 * @param h ASCII アートの縦幅（行数）
 * @returns 各行の文字列を格納した配列
 */
function imageToAscii(src: string, w: number, h: number): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(FALLBACK_ART); return; }
      ctx.drawImage(img, 0, 0);

      const cellW = img.width  / w;
      const cellH = img.height / h;
      const lines: string[] = [];

      for (let row = 0; row < h; row++) {
        let line = "";
        for (let col = 0; col < w; col++) {
          const x  = Math.floor(col * cellW);
          const y  = Math.floor(row * cellH);
          const cw = Math.max(1, Math.floor(cellW));
          const ch = Math.max(1, Math.floor(cellH));
          const { data } = ctx.getImageData(x, y, cw, ch);

          let sum = 0;
          const pixels = data.length / 4;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3] / 255;
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            sum += lum * a + (1 - a);
          }
          const avg = sum / pixels;
          const idx = Math.min(
            AA_CHARS.length - 1,
            Math.floor((1 - avg) * AA_CHARS.length)
          );
          line += AA_CHARS[idx];
        }
        lines.push(line);
      }
      resolve(lines);
    };
    img.onerror = () => resolve(FALLBACK_ART);
    img.src = src;
  });
}

/**
 * SSH ログイン風アニメーションを再生するフルスクリーンオーバーレイコンポーネント。
 * {@link Phase} に従いタイプライター・認証バー・neofetch 演出を順次実行する。
 * neofetch フェーズ中はクリックでスキップ可能。
 * fading 開始から 700ms 後に `onDone` を呼び出してオーバーレイを解除する。
 * @param onDone アニメーション完了時に呼ばれるコールバック
 */
export function LoginOverlay({ onDone }: Props) {
  const [phase,       setPhase] = useState<Phase>("ssh");
  const [sshText,     setSsh]   = useState("");
  const [dotCount,    setDots]  = useState(0);
  const [barCount,    setBar]   = useState(0);
  const [launchCount, setLaunch]= useState(0);
  const [asciiArt,    setArt]   = useState<string[]>(FALLBACK_ART);

  // フェーズ遷移用 setTimeout を ref で追跡し、アンマウント時に確実にキャンセルする
  const pendingTid = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (pendingTid.current) clearTimeout(pendingTid.current); }, []);

  useEffect(() => {
    imageToAscii("/assets/image/logo-v4.png", AA_W, AA_H).then(setArt);
  }, []);

  // ─── SSH タイプライター ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "ssh") return;
    let i = 0;
    const iv = setInterval(() => {
      setSsh(SSH_CMD.slice(0, ++i));
      if (i >= SSH_CMD.length) { clearInterval(iv); pendingTid.current = setTimeout(() => setPhase("connected"), 400); }
    }, 32);
    return () => clearInterval(iv);
  }, [phase]);

  // ─── タイムアウト駆動のフェーズ遷移 ─────────────────────────────────────────
  useEffect(() => {
    const transitions: Partial<Record<Phase, [Phase, number]>> = {
      connected: ["login",     500],
      login:     ["password",  380],
      granted:   ["welcome",   550],
      welcome:   ["neofetch", 1000],
    };
    const entry = transitions[phase];
    if (!entry) return;
    const t = setTimeout(() => setPhase(entry[0]), entry[1]);
    return () => clearTimeout(t);
  }, [phase]);

  // ─── パスワードドット入力 ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "password") return;
    let d = 0;
    const iv = setInterval(() => {
      setDots(++d);
      if (d >= DOTS) { clearInterval(iv); pendingTid.current = setTimeout(() => setPhase("auth"), 500); }
    }, 100);
    return () => clearInterval(iv);
  }, [phase]);

  // ─── 認証プログレスバー ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "auth") return;
    let b = 0;
    const iv = setInterval(() => {
      setBar(++b);
      if (b >= BAR_TOTAL) { clearInterval(iv); pendingTid.current = setTimeout(() => setPhase("granted"), 350); }
    }, 48);
    return () => clearInterval(iv);
  }, [phase]);

  // ─── neofetch：起動プログレスバー ───────────────────────────────────────────
  useEffect(() => {
    if (phase !== "neofetch") return;
    // ローカルカウンターで管理し、state は表示用にのみ使う
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setLaunch(count);
      if (count >= LAUNCH_TOTAL) clearInterval(iv);
    }, 2200 / LAUNCH_TOTAL);
    const t = setTimeout(() => {
      setPhase("fading");
      pendingTid.current = setTimeout(() => onDone(), 700);
    }, 2200);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [phase, onDone]);

  const phaseIdx = PHASE_ORDER.indexOf(phase);
  const reached  = (p: Phase) => phaseIdx >= PHASE_ORDER.indexOf(p);

  const authBar  = "█".repeat(barCount)    + "░".repeat(BAR_TOTAL    - barCount);
  const authPct  = Math.round((barCount    / BAR_TOTAL)    * 100);
  const lbar     = "█".repeat(launchCount) + "░".repeat(LAUNCH_TOTAL - launchCount);
  const lpct     = Math.round((launchCount / LAUNCH_TOTAL) * 100);
  const isNf     = phase === "neofetch" || phase === "fading";

  const handleSkip = () => {
    if (phase !== "neofetch") return;
    setLaunch(LAUNCH_TOTAL);
    setPhase("fading");
    pendingTid.current = setTimeout(() => onDone(), 700);
  };

  return (
    <div
      className={`lo-overlay${phase === "fading" ? " lo-fade" : ""}`}
      onClick={handleSkip}
      title={isNf ? "クリックでスキップ" : undefined}
    >
      <div className={`lo-box${isNf ? " lo-box--wide" : ""}`}>

        <div className="lo-titlebar">
          <span className="lo-dot lo-dot--r" />
          <span className="lo-dot lo-dot--y" />
          <span className="lo-dot lo-dot--g" />
          <span className="lo-title-text">
            {reached("granted") ? "bash" : "login"} — asteriskx@portfolio
          </span>
        </div>

        <div className="lo-body">
          {/* ── SSH command ── */}
          <p className="lo-line lo-cmd">
            {sshText}
            <span className={`lo-cursor${phase !== "ssh" ? " lo-cursor--off" : ""}`}>_</span>
          </p>

          {/* ── Connected ── */}
          {reached("connected") && (
            <p className="lo-line lo-info">Connected to asteriskx.net</p>
          )}

          {/* ── Login ── */}
          {reached("login") && (
            <><p className="lo-line">&nbsp;</p>
            <p className="lo-line lo-dim">Login: <span className="lo-cmd">asteriskx</span></p></>
          )}

          {/* ── Password ── */}
          {reached("password") && (
            <p className="lo-line lo-dim">Password: <span className="lo-dots">{"•".repeat(dotCount)}</span></p>
          )}

          {/* ── Auth bar ── */}
          {reached("auth") && (
            <><p className="lo-line">&nbsp;</p>
            <p className="lo-line lo-info">
              Verifying...&nbsp;
              <span className="lo-bar">{authBar}</span>&nbsp;
              <span className="lo-pct">{authPct}%</span>
            </p></>
          )}

          {/* ── Access granted ── */}
          {reached("granted") && (
            <p className="lo-line lo-success">Access granted.</p>
          )}

          {/* ── Welcome ── */}
          {reached("welcome") && (
            <>
              <p className="lo-line lo-welcome">Welcome to</p>
              <pre className="lo-banner-art">{FULL_BANNER.join("\n")}</pre>
            </>
          )}

          {/* ── neofetch ── */}
          {reached("neofetch") && (
            <>
              <p className="lo-line">&nbsp;</p>
              <div className="lo-nf">
                <div className="lo-nf-art">
                  {asciiArt.map((line, i) => (
                    <div key={i} className="lo-nf-artline">{line}</div>
                  ))}
                </div>
                <div className="lo-nf-info">
                  {SYSINFO.map((row, i) => (
                    <div key={i} className={`lo-nf-row${row.cls ? ` ${row.cls}` : ""}`}>
                      {row.label
                        ? <><span className="lo-nf-label">{row.label}</span><span className="lo-nf-colon">: </span><span className="lo-nf-val">{row.value}</span></>
                        : <span className="lo-nf-val">{row.value}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <p className="lo-line lo-launch">
                &gt; Launching asteriskx.net...&nbsp;
                <span className="lo-bar">[{lbar}]</span>&nbsp;
                <span className="lo-pct">{lpct}%</span>
              </p>
              <p className="lo-line lo-skip-hint">[ click anywhere to skip ]</p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
