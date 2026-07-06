import type { CheerMessageTemplate } from './messageTypes';
import type { SessionPhase, TonePreference } from '../modes/types';
import { messageBank } from './messageBank';

export interface SelectMessageInput {
  phase: SessionPhase;
  /** セッション進行度 0〜1。後半ほど intensity の高いメッセージを優先 */
  progress: number;
  /** 直近に使ったメッセージID。これらは選ばない */
  recentIds: readonly string[];
  rand: () => number;
  /** ユーザーが選んだ応援トーン。'auto' または省略でおまかせ */
  tonePreference?: TonePreference;
  pool?: readonly CheerMessageTemplate[];
}

/** 進行度に応じた望ましい intensity（1〜5） */
export function desiredIntensity(progress: number): number {
  return Math.min(5, Math.max(1, Math.round(1 + progress * 4)));
}

/**
 * フェーズ一致・intensity 近接・非重複を考慮してメッセージを1件選ぶ。
 * 候補が尽きた場合のみ recentIds を無視して再選択する。
 */
export function selectMessage(input: SelectMessageInput): CheerMessageTemplate {
  const pool = input.pool ?? messageBank;
  const target = desiredIntensity(input.progress);

  const tone = input.tonePreference ?? 'auto';

  const score = (m: CheerMessageTemplate): number => {
    let s = 0;
    if (m.phase === input.phase) s += 4;
    else if (m.phase === 'any') s += 2;
    else return -1; // 他フェーズ専用は除外
    s += 2 - Math.min(2, Math.abs(m.intensity - target));
    // トーン指定時は一致を強く優先する（他トーンも完全排除はしない）
    if (tone !== 'auto' && m.tone === tone) s += 3;
    return s;
  };

  const fresh = pool.filter(
    (m) => !input.recentIds.includes(m.id) && score(m) >= 0,
  );
  const candidates = fresh.length > 0 ? fresh : pool.filter((m) => score(m) >= 0);

  const best = Math.max(...candidates.map(score));
  // ベストスコア帯からランダムに選び、単調な繰り返しを避ける
  const top = candidates.filter((m) => score(m) >= best - 1);
  return top[Math.floor(input.rand() * top.length)];
}
