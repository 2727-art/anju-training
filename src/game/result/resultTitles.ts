import type { MessageFrequency, TonePreference } from '../modes/types';

/**
 * 称号の選定に使うコンテキスト。
 * すべて「完走のしかた」を表す値であり、実測成績は含まない。
 */
export interface TitleContext {
  durationSec: number;
  missionCount: number;
  maxCombo: number;
  shownMessageCount: number;
  tonePreference: TonePreference;
  messageFrequency: MessageFrequency;
}

export interface ResultTitle {
  id: string;
  label: string;
  /** 大きいほど優先。同率の中からコンテキストに応じて1つ選ぶ */
  priority: number;
  matches(ctx: TitleContext): boolean;
}

const allCleared = (ctx: TitleContext) =>
  ctx.missionCount > 0 && ctx.maxCombo >= ctx.missionCount;

/**
 * 称号バンク（30件以上）。
 * 方針: 実測成果・運動回数・カロリー・体型・医療効果を示さない。
 * 完走、継続、流れ、ペース、集中、応援体験を英語ベースの短い語で讃える。
 */
export const resultTitles: ResultTitle[] = [
  // ---- 全ミッションクリア相当 ----
  { id: 'perfect-marathon', label: 'PERFECT MARATHON', priority: 100, matches: (c) => allCleared(c) && c.durationSec >= 180 },
  { id: 'full-support-clear', label: 'FULL SUPPORT CLEAR', priority: 90, matches: allCleared },
  { id: 'full-flow-clear', label: 'FULL FLOW CLEAR', priority: 90, matches: allCleared },

  // ---- 長尺セッション ----
  { id: 'epic-journey', label: 'EPIC JOURNEY', priority: 80, matches: (c) => c.durationSec >= 300 },
  { id: 'long-run-master', label: 'LONG RUN MASTER', priority: 75, matches: (c) => c.durationSec >= 120 && c.maxCombo >= 5 },
  { id: 'long-run-finisher', label: 'LONG RUN FINISHER', priority: 70, matches: (c) => c.durationSec >= 120 },

  // ---- コンボ・流れ ----
  { id: 'combo-rider', label: 'COMBO RIDER', priority: 60, matches: (c) => c.maxCombo >= 6 },
  { id: 'rhythm-keep', label: 'RHYTHM KEEP', priority: 60, matches: (c) => c.maxCombo >= 6 },

  // ---- LAST PUSH完走（後半までミッションをつないだ完走） ----
  { id: 'last-push-clear', label: 'LAST PUSH CLEAR', priority: 55, matches: (c) => c.missionCount > 0 && c.maxCombo >= Math.ceil(c.missionCount * 0.6) && c.durationSec >= 45 },
  { id: 'keep-going-clear', label: 'KEEP GOING CLEAR', priority: 55, matches: (c) => c.missionCount > 0 && c.maxCombo >= Math.ceil(c.missionCount * 0.6) },
  { id: 'finish-with-flow', label: 'FINISH WITH FLOW', priority: 55, matches: (c) => c.missionCount > 0 && c.maxCombo >= Math.ceil(c.missionCount * 0.6) },

  // ---- トーン別: gentle ----
  { id: 'gentle-finish', label: 'GENTLE FINISH', priority: 50, matches: (c) => c.tonePreference === 'gentle' },
  { id: 'soft-landing', label: 'SOFT LANDING', priority: 50, matches: (c) => c.tonePreference === 'gentle' },
  { id: 'pace-friend', label: 'PACE FRIEND', priority: 50, matches: (c) => c.tonePreference === 'gentle' },

  // ---- トーン別: energetic ----
  { id: 'energy-flow', label: 'ENERGY FLOW', priority: 50, matches: (c) => c.tonePreference === 'energetic' },
  { id: 'bright-finish', label: 'BRIGHT FINISH', priority: 50, matches: (c) => c.tonePreference === 'energetic' },
  { id: 'cheer-finish', label: 'CHEER FINISH', priority: 50, matches: (c) => c.tonePreference === 'energetic' },

  // ---- トーン別: focused ----
  { id: 'focus-flow', label: 'FOCUS FLOW', priority: 50, matches: (c) => c.tonePreference === 'focused' },
  { id: 'focus-complete', label: 'FOCUS COMPLETE', priority: 50, matches: (c) => c.tonePreference === 'focused' },

  // ---- トーン別: calm ----
  { id: 'calm-session', label: 'CALM SESSION', priority: 50, matches: (c) => c.tonePreference === 'calm' },
  { id: 'quiet-complete', label: 'QUIET COMPLETE', priority: 50, matches: (c) => c.tonePreference === 'calm' },

  // ---- 表示頻度: 多め（応援体験） ----
  { id: 'cheer-collector', label: 'CHEER COLLECTOR', priority: 45, matches: (c) => c.messageFrequency === 'high' || c.shownMessageCount >= 15 },
  { id: 'support-complete', label: 'SUPPORT COMPLETE', priority: 45, matches: (c) => c.messageFrequency === 'high' },
  { id: 'nice-support-run', label: 'NICE SUPPORT RUN', priority: 45, matches: (c) => c.messageFrequency === 'high' },
  { id: 'support-runner', label: 'SUPPORT RUNNER', priority: 45, matches: (c) => c.shownMessageCount >= 10 },

  // ---- 表示頻度: 少なめ（安定ペース） ----
  { id: 'steady-finish', label: 'STEADY FINISH', priority: 45, matches: (c) => c.messageFrequency === 'low' },
  { id: 'smooth-run', label: 'SMOOTH RUN', priority: 45, matches: (c) => c.messageFrequency === 'low' },
  { id: 'steady-runner', label: 'STEADY RUNNER', priority: 45, matches: (c) => c.messageFrequency === 'low' },

  // ---- 流れ（中コンボ） ----
  { id: 'good-flow', label: 'GOOD FLOW', priority: 40, matches: (c) => c.maxCombo >= 3 },
  { id: 'flow-session', label: 'FLOW SESSION', priority: 40, matches: (c) => c.maxCombo >= 3 },

  // ---- 短尺セッション ----
  { id: 'quick-starter', label: 'QUICK STARTER', priority: 35, matches: (c) => c.durationSec < 30 },
  { id: 'clear-step', label: 'CLEAR STEP', priority: 35, matches: (c) => c.durationSec < 30 },

  // ---- フォールバック（常に候補になる） ----
  { id: 'nice-keep', label: 'NICE KEEP', priority: 10, matches: () => true },
  { id: 'your-pace-clear', label: 'YOUR PACE CLEAR', priority: 10, matches: () => true },
  { id: 'good-session', label: 'GOOD SESSION', priority: 10, matches: () => true },
  { id: 'daily-flow', label: 'DAILY FLOW', priority: 10, matches: () => true },
];

/**
 * コンテキストに合う称号を1つ選ぶ。
 * 最も優先度の高い候補群から、コンテキスト由来のハッシュで安定的に選ぶ。
 * どれにも一致しない場合（理論上起きない）も 'GOOD SESSION' にフォールバックする。
 */
export function pickTitle(ctx: TitleContext): string {
  const candidates = resultTitles.filter((t) => t.matches(ctx));
  if (candidates.length === 0) return 'GOOD SESSION';
  const top = candidates.filter(
    (t) => t.priority === Math.max(...candidates.map((c) => c.priority)),
  );
  const hash =
    Math.floor(ctx.durationSec) + ctx.maxCombo * 7 + ctx.shownMessageCount * 13;
  return top[hash % top.length].label;
}
