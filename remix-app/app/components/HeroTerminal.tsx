import { useEffect, useRef, useState } from "react";
import { LogoSlashReveal } from "./LogoSlashReveal";

const LOGOS = [
  "/assets/image/logo-v2.png",
  "/assets/image/logo-v3.png",
  "/assets/image/logo-v4.png",
  "/assets/image/logo-v5.png",
];

function useTyped(text: string, ms: number, active: boolean, onDone: () => void) {
  const [out, setOut] = useState("");
  const done = useRef(false);
  // onDone を ref で持ち最新参照を維持。deps に含めると active 変化のたびに
  // effect が再実行されてタイピングがリセットされてしまうため ref 経由にする
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active || done.current) return;
    setOut("");
    done.current = false;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const t = setInterval(() => {
      setOut(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(t);
        done.current = true;
        // interval 最終ティック後の setTimeout を追跡し cleanup できるようにする
        timeoutId = setTimeout(() => onDoneRef.current(), 180);
      }
    }, ms);
    return () => {
      clearInterval(t);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [active, text, ms]);
  return out;
}

export function HeroTerminal() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);

  const cmdName  = useTyped("name",  85, step >= 1, next);
  const namePart1 = useTyped("たっけん", 75, step >= 2, next);
  const namePart2 = useTyped("@あすた", 75, step >= 3, next);
  const cmdRole  = useTyped("role",  85, step >= 4, next);
  const roleOut  = useTyped("Chief Engineer, Embedded Software.", 50, step >= 5, next);
  const cmdInfo  = useTyped("info",  85, step >= 6, next);
  const infoL1   = useTyped("C / C# / Rust を中心に、組み込みシステムから", 32, step >= 7, next);
  const infoL2   = useTyped("デスクトップアプリ・言語設計まで幅広く手がけています。", 32, step >= 8, next);
  const cmdSkills = useTyped("skills", 85, step >= 9, next);

  const [sk1, setSk1] = useState(false);
  const [sk2, setSk2] = useState(false);
  const [sk3, setSk3] = useState(false);
  const [sk4, setSk4] = useState(false);
  const [sk5, setSk5] = useState(false);

  useEffect(() => {
    if (step < 10) return;
    const t1 = setTimeout(() => setSk1(true), 80);
    const t2 = setTimeout(() => setSk2(true), 220);
    const t3 = setTimeout(() => setSk3(true), 360);
    const t4 = setTimeout(() => setSk4(true), 500);
    const t5 = setTimeout(() => setSk5(true), 640);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [step]);

  // Start sequence after mount
  useEffect(() => {
    const t = setTimeout(() => setStep(1), 500);
    return () => clearTimeout(t);
  }, []);


  return (
    <div className="hero-terminal">
      <div className="term-body">
        <div className="term-commands">

          {/* $ name */}
          <span className="term-line">
            <span className="term-prompt">$</span>
            <span className="term-cmd">{cmdName}</span>
            {step < 2 && <span className="term-blink">▌</span>}
          </span>
          {step >= 2 && (
            <div className="term-result">
              <span className="term-result-line">
                <span>{namePart1}</span>
                <span className="term-name-accent">{namePart2}</span>
              </span>
            </div>
          )}

          {/* $ role */}
          {step >= 4 && (
            <span className="term-line">
              <span className="term-prompt">$</span>
              <span className="term-cmd">{cmdRole}</span>
              {step === 4 && <span className="term-blink">▌</span>}
            </span>
          )}
          {step >= 5 && (
            <div className="term-result">
              <span className="term-result-line term-role-val">{roleOut}</span>
            </div>
          )}

          {/* $ info */}
          {step >= 6 && (
            <span className="term-line">
              <span className="term-prompt">$</span>
              <span className="term-cmd">{cmdInfo}</span>
              {step === 6 && <span className="term-blink">▌</span>}
            </span>
          )}
          {step >= 7 && (
            <div className="term-result">
              <span className="term-result-line">{infoL1}</span>
              {step >= 8 && <span className="term-result-line">{infoL2}</span>}
            </div>
          )}

          {/* $ skills */}
          {step >= 9 && (
            <span className="term-line">
              <span className="term-prompt">$</span>
              <span className="term-cmd">{cmdSkills}</span>
              {step === 9 && <span className="term-blink">▌</span>}
            </span>
          )}
          {step >= 10 && (
            <div className="term-result">
              {sk1 && (
                <span className="term-skill-row">
                  <span className="term-sk-cat">Systems   </span>
                  <span className="term-sk-sep"> │ </span>
                  <span className="term-sk-val">C · C++ · Assembly · Rust</span>
                </span>
              )}
              {sk2 && (
                <span className="term-skill-row">
                  <span className="term-sk-cat">App       </span>
                  <span className="term-sk-sep"> │ </span>
                  <span className="term-sk-val">C# · Java · Python</span>
                </span>
              )}
              {sk3 && (
                <span className="term-skill-row">
                  <span className="term-sk-cat">Web/Script</span>
                  <span className="term-sk-sep"> │ </span>
                  <span className="term-sk-val">TypeScript · Node.js · Ruby · VBA · HTML</span>
                </span>
              )}
              {sk4 && (
                <span className="term-skill-row">
                  <span className="term-sk-cat">Graphics  </span>
                  <span className="term-sk-sep"> │ </span>
                  <span className="term-sk-val">Processing · p5.js · Three.js</span>
                </span>
              )}
              {sk5 && (
                <span className="term-skill-row">
                  <span className="term-sk-cat">Infra     </span>
                  <span className="term-sk-sep"> │ </span>
                  <span className="term-sk-val">Linux (Ubuntu · Arch · CentOS) · NW L1–L4 · サーバ構築</span>
                </span>
              )}
            </div>
          )}

          <div className="term-divider" />

          <div className="hero-tags">
            <span className="htag">Systems</span>
            <span className="htag">Language Design</span>
            <span className="htag">Desktop Apps</span>
          </div>
          <a href="#work" className="hero-cta">
            Work <span className="cta-arrow">↓</span>
          </a>
        </div>

        <div className="term-logo">
          <LogoSlashReveal logos={LOGOS} intervalMs={5000} />
        </div>
      </div>
    </div>
  );
}
