import type { SessionPlan } from '../modes/types';
import type { SessionResult } from './resultTypes';
import { getMode } from '../modes/modeRegistry';

/** コンボ・メッセージなど再生中に集計する値 */
export interface SessionStats {
  maxCombo: number;
  shownMessageCount: number;
}

function pickTitle(plan: SessionPlan, stats: SessionStats): string {
  if (stats.maxCombo >= plan.missions.length && plan.missions.length > 0) {
    return 'FULL SUPPORT CLEAR';
  }
  if (plan.durationSec >= 120) return 'LONG RUN FINISHER';
  if (stats.maxCombo >= 3) return 'GOOD FLOW';
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
