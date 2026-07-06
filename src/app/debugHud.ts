import type { MessageFrequency, SessionPhase, TonePreference } from '../game/modes/types';
import type { CalloutKind } from '../game/hud/calloutQueue';

/**
 * HUDデバッグモード（開発用）。
 * URLクエリ `?debugHud=1` で有効。実動画なしでHUD状態を確認するためのもの。
 * 設定は localStorage に保存しない（URLだけで完結させる）。
 */
export interface DebugHudConfig {
  enabled: boolean;
  phase: SessionPhase;
  callout: CalloutKind | null;
  density: MessageFrequency;
  tone: TonePreference;
}

const PHASES: readonly SessionPhase[] = ['start', 'warmup', 'keep', 'push', 'finish'];
const CALLOUTS: readonly CalloutKind[] = ['clear', 'fever', 'lastpush', 'finish'];
const DENSITIES: readonly MessageFrequency[] = ['low', 'normal', 'high'];
const TONES: readonly TonePreference[] = ['auto', 'gentle', 'energetic', 'focused', 'calm'];

function pick<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return allowed.includes(value as T) ? (value as T) : null;
}

/** location.search（例: "?debugHud=1&phase=push"）を解析する */
export function parseDebugHud(search: string): DebugHudConfig {
  const params = new URLSearchParams(search);
  return {
    enabled: params.get('debugHud') === '1',
    phase: pick(params.get('phase'), PHASES) ?? 'keep',
    callout: pick(params.get('callout'), CALLOUTS),
    density: pick(params.get('density'), DENSITIES) ?? 'normal',
    tone: pick(params.get('tone'), TONES) ?? 'auto',
  };
}
