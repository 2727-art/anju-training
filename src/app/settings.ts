import type { SessionOptions } from '../game/modes/types';
import { defaultSessionOptions } from '../game/modes/types';

/**
 * ユーザー設定の永続化。
 * 保存するのはトーンと表示頻度のみ。動画ファイル名・パス・Blob URL は保存しない。
 */
const STORAGE_KEY = 'anju-training:settings:v1';

const TONES = ['auto', 'gentle', 'energetic', 'focused', 'calm'];
const FREQUENCIES = ['low', 'normal', 'high'];

export function loadSettings(): SessionOptions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultSessionOptions };
    const parsed = JSON.parse(raw) as Partial<SessionOptions>;
    return {
      tonePreference: TONES.includes(parsed.tonePreference as string)
        ? (parsed.tonePreference as SessionOptions['tonePreference'])
        : defaultSessionOptions.tonePreference,
      messageFrequency: FREQUENCIES.includes(parsed.messageFrequency as string)
        ? (parsed.messageFrequency as SessionOptions['messageFrequency'])
        : defaultSessionOptions.messageFrequency,
    };
  } catch {
    return { ...defaultSessionOptions };
  }
}

export function saveSettings(settings: SessionOptions): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ストレージが使えない環境でも動作は続ける
  }
}
