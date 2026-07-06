import type { SessionPhase } from '../modes/types';

export type MessageTone = 'gentle' | 'energetic' | 'focused' | 'calm';

export interface CheerMessageTemplate {
  id: string;
  text: string;
  /** 出したいフェーズ。'any' はどのフェーズでも使える */
  phase: SessionPhase | 'any';
  tone: MessageTone;
  /** 1（穏やか）〜 5（最大の盛り上げ）。後半ほど高い値を優先 */
  intensity: 1 | 2 | 3 | 4 | 5;
  tags: string[];
}
