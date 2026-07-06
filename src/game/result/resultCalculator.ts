import type { SessionPlan } from '../modes/types';
import type { SessionResult } from './resultTypes';
import { getMode } from '../modes/modeRegistry';
import { pickTitle, type TitleContext } from './resultTitles';

/** コンボ・メッセージなど再生中に集計する値 */
export interface SessionStats {
  maxCombo: number;
  shownMessageCount: number;
}

export function titleContextOf(plan: SessionPlan, stats: SessionStats): TitleContext {
  return {
    durationSec: plan.durationSec,
    missionCount: plan.missions.length,
    maxCombo: stats.maxCombo,
    shownMessageCount: stats.shownMessageCount,
    tonePreference: plan.options.tonePreference,
    messageFrequency: plan.options.messageFrequency,
  };
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
    title: pickTitle(titleContextOf(plan, stats)),
  };
}
