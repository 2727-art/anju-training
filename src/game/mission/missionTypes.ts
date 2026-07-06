import type { SessionPhase } from '../modes/types';

/**
 * オート進行ミッション。
 * 実測判定は行わず、動画の再生時間に合わせて開始・クリアする。
 */
export interface Mission {
  id: string;
  /** 表示ラベル（例: リズムキープ）。回数や種目を断定しない */
  label: string;
  phase: SessionPhase;
  startTime: number;
  endTime: number;
}
