/**
 * 季節イベントの期間定義。
 * start / end は [月, 日] の形式（1 始まり）。
 * 年をまたぐ期間（例: 冬 12/20〜1/15）も対応。
 */
const SEASONAL_EVENTS = {
  /** 春: 夜桜 */
  sakura:  { start: [3, 15] as const, end: [4, 30] as const },
  /** 夏: 七夕・夏祭り・花火 */
  summer:  { start: [7,  1] as const, end: [8, 31] as const },
  /** 秋: 紅葉 */
  autumn:  { start: [10, 15] as const, end: [11, 30] as const },
  /** 冬: クリスマス・年末年始・雪 */
  winter:  { start: [12, 20] as const, end: [1,  15] as const },
} as const;

export type SeasonalEventKey = keyof typeof SEASONAL_EVENTS;

/**
 * 現在日付が指定した季節イベントの期間内かどうかを返す。
 * 冬のように年をまたぐ期間（12/20〜1/15）にも対応する。
 *
 * 年またぎ判定:
 *   start 月 > end 月 のとき、「start 以降 OR end 以前」で判定する。
 */
export function useSeasonalEvent(key: SeasonalEventKey): boolean {
  const { start, end } = SEASONAL_EVENTS[key];
  const now   = new Date();
  const month = now.getMonth() + 1;
  const day   = now.getDate();

  // 日付を比較しやすいよう MMDD 形式の数値に変換する
  const toMMDD  = (m: number, d: number) => m * 100 + d;
  const current = toMMDD(month, day);
  const s       = toMMDD(start[0], start[1]);
  const e       = toMMDD(end[0],   end[1]);

  // 年またぎ（例: 冬 1220〜0115）は start > end になる
  if (s > e)
    return current >= s || current <= e;

  return current >= s && current <= e;
}
