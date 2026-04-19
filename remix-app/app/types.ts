/**
 * ブログ記事の MDX フロントマター型定義。
 * MDX ファイル先頭の YAML ブロックに対応する。
 */
export interface PostFrontmatter {
  /** 記事タイトル */
  title: string;
  /** 公開日（YYYY-MM-DD 形式） */
  date: string;
  /** 記事の短い説明文（一覧ページの概要表示に使用） */
  description: string;
  /** 記事のタグ一覧（フィルタリング・カテゴリ表示に使用） */
  tags?: string[];
}
