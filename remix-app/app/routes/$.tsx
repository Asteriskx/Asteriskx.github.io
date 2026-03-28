import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

/** 存在しないパスへのアクセスをキャッチする 404 ページ */
export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const tid = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(tid);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tid);
  }, [navigate]);

  return (
    <div className="notfound-wrap">
      <div className="notfound-terminal">
        <div className="nf-titlebar">
          <span className="nf-dot nf-dot-r" />
          <span className="nf-dot nf-dot-y" />
          <span className="nf-dot nf-dot-g" />
        </div>

        <div className="nf-line">
          <span className="nf-prompt">$ </span>
          <span className="nf-cmd">cd {pathname}</span>
        </div>
        <div className="nf-line">
          <span className="nf-err">
            bash: cd: {pathname}: No such file or directory
          </span>
        </div>

        <hr className="nf-sep" />

        <div className="nf-line">
          <span className="nf-dim">// 404 — page not found</span>
        </div>

        <hr className="nf-sep" />

        <div className="nf-line">
          <span className="nf-prompt">$ </span>
          <span className="nf-cmd">
            cd{" "}
            <a href="/" className="nf-home-link" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              ~
            </a>
          </span>
        </div>
        <div className="nf-line">
          <span className="nf-dim">Redirecting in </span>
          <span className="nf-countdown">{count}</span>
          <span className="nf-dim">...</span>
        </div>
      </div>
    </div>
  );
}
