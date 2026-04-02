import { useNavigate } from "react-router";
import { useIsSakuraSeason } from "../hooks/useIsSakuraSeason";

/**
 * 桜シーズン（3/15〜4/30）中だけヒーローセクションに表示される
 * 隠しイースターエッグ。桜の花形をクリックすると /sakura へ遷移する。
 * テキスト・tooltip は一切なし。気づいた人だけが辿り着けるリンク。
 */
export function SakuraHint() {
  const isSeason = useIsSakuraSeason();
  const navigate = useNavigate();

  if (!isSeason) return null;

  return (
    <button
      className="sakura-hint"
      onClick={() => navigate("/sakura")}
      aria-label="sakura"
    >
      {/* SVG 5枚花びら桜。楕円を 72° ずつ回転して配置する */}
      <svg
        className="sakura-hint-flower"
        viewBox="-2 -2 4 4"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g fill="#FFB7C5">
          <ellipse rx="0.55" ry="1.0" transform="rotate(0)   translate(0, -0.65)" />
          <ellipse rx="0.55" ry="1.0" transform="rotate(72)  translate(0, -0.65)" />
          <ellipse rx="0.55" ry="1.0" transform="rotate(144) translate(0, -0.65)" />
          <ellipse rx="0.55" ry="1.0" transform="rotate(216) translate(0, -0.65)" />
          <ellipse rx="0.55" ry="1.0" transform="rotate(288) translate(0, -0.65)" />
        </g>
        {/* 花の中心 */}
        <circle r="0.28" fill="#FFD0DC" />
      </svg>
    </button>
  );
}
