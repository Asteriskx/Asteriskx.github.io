import { useRef, useState } from "react";

/**
 * MDX の <pre> を差し替えるコードブロックコンポーネント。
 * コピーボタンを右上に配置し、クリックでコード全文をクリップボードへコピーする。
 * テキスト抽出は DOM の textContent を使い、React children のパースを避ける。
 */
export function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  const preRef         = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrap">
      <button className="code-copy-btn" onClick={handleCopy} aria-label="コードをコピー">
        {copied ? "copied!" : "copy"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
