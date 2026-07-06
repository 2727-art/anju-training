import type { GameModeId } from '../modes/types';

/**
 * セッション完走結果。
 * 実測成績ではなく「動画セッションを完走した」ことを表す値のみ持つ。
 */
export interface SessionResult {
  modeId: GameModeId;
  modeLabel: string;
  /** 完走時間（秒） */
  durationSec: number;
  /** 発生したミッション数 */
  missionCount: number;
  /** 表示された応援メッセージ数 */
  messageCount: number;
  /** 最大コンボ */
  maxCombo: number;
  /** 今日の称号 */
  title: string;
}
