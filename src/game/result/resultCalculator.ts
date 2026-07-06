import type { SessionPlan } from '../modes/types';
import type { SessionResult } from './resultTypes';
import { getMode } from '../modes/modeRegistry';

/** コンボ・メッセージなど再生中に集計する値 */
export interface SessionStats {
  maxCombo: number;
  shownMessageCount: number;
}

/**
 * 今日の称号。実測成績ではなく「完走のしかた」を讃えるバリエーション。
 * 上から順に条件を評価し、最初に当てはまったものを返す。
 */
export function pickTitle(plan: SessionPlan, stats: SessionStats): string {
  const missionCount = plan.missions.length;
  const allCleared = missionCount > 0 && stats.maxCombo >= missionCount;

  if (allCleared && plan.durationSec >= 180) return 'PERFECT MARATHON';
  if (allCleared) return 'FULL SUPPORT CLEAR';
  if (plan.durationSec >= 300) return 'EPIC JOURNEY';
  if (plan.durationSec >= 120 && stats.maxCombo >= 5) return 'LONG RUN MASTER';
  if (plan.durationSec >= 120) return 'LONG RUN FINISHER';
  if (stats.maxCombo >= 6) return 'COMBO RIDER';
  if (stats.maxCombo >= 3) return 'GOOD FLOW';
  if (stats.shownMessageCount >= 15) return 'CHEER COLLECTOR';
  if (plan.durationSec < 30) return 'QUICK STARTER';
  return 'NICE KEEP';
}

/**
 * 完走結果を組み立てる。
 * 実測風の成績は出さず、完走した事実に寄せた値のみ返す。
 */
export function calculateResult(plan: SessionPlan, stats: SessionStats): SessionResult {
  const mode = getMode(plan.modeId);
  return {
    modeId: plan.modeId,
    modeLabel: mode.label,
    durationSec: plan.durationSec,
    missionCount: plan.missions.length,
    messageCount: stats.shownMessageCount,
    maxCombo: stats.maxCombo,
    title: pickTitle(plan, stats),
  };
}
