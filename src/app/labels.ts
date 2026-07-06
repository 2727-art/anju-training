import type { MessageFrequency, TonePreference } from '../game/modes/types';

/**
 * 内部値とUI表示名の対応（単一の情報源）。
 * UI・ドキュメント・テストはこの表記に合わせる。
 */
export const TONE_LABELS: Record<TonePreference, { label: string; hint: string }> = {
  auto: { label: 'おまかせ', hint: 'フェーズに合わせて自動で選ぶ' },
  gentle: { label: 'やさしめ', hint: '無理なく続けたい時' },
  energetic: { label: '元気', hint: 'テンションを上げたい時' },
  focused: { label: '集中', hint: 'ペースを保ちたい時' },
  calm: { label: 'しずか', hint: '落ち着いて進めたい時' },
};

export const FREQUENCY_LABELS: Record<MessageFrequency, { label: string; hint: string }> = {
  low: { label: '少なめ', hint: '動画をじっくり見たい時' },
  normal: { label: 'ふつう', hint: '標準の応援量' },
  high: { label: '多め', hint: '応援を多く表示したい時' },
};

export const TONE_ORDER: readonly TonePreference[] = [
  'auto',
  'gentle',
  'energetic',
  'focused',
  'calm',
];

export const FREQUENCY_ORDER: readonly MessageFrequency[] = ['low', 'normal', 'high'];
