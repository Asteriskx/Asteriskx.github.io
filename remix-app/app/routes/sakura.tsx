import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "../components/ClientOnly";
import { SakuraCanvas } from "../components/SakuraCanvas";
import { useIsSakuraSeason } from "../hooks/useIsSakuraSeason";

export const meta: MetaFunction = () => [
  { title: "Hanami — asteriskx.net" },
];

/**
 * 桜の花びらが舞い落ちる没入型ページ（春限定: 3/15〜4/30）。
 * シーズン外にアクセスされた場合はトップへリダイレクトする。
 */
export default function Sakura() {
  const isSeason = useIsSakuraSeason();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSeason) navigate("/", { replace: true });
  }, [isSeason, navigate]);

  // シーズン外はリダイレクト中なので何も表示しない
  if (!isSeason) return null;

  return (
    <>
      <ClientOnly>{() => <SakuraCanvas />}</ClientOnly>

      {/* 戻るリンク（左上固定） */}
      <a href="/" className="sakura-back">
        ← back
      </a>

      {/* ページタイトル（右下固定・装飾） */}
      <div className="sakura-title" aria-hidden="true">
        hanami
      </div>
    </>
  );
}
