import { useSeasonalEvent } from "./useSeasonalEvent";

/**
 * 桜シーズン（3/15〜4/30）かどうかを返す。
 * {@link useSeasonalEvent} の sakura イベント用ラッパー。
 */
export function useIsSakuraSeason(): boolean {
  return useSeasonalEvent("sakura");
}
