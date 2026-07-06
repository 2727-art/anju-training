import { describe, expect, it } from 'vitest';
import { messageBank } from '../src/game/messages/messageBank';
import type { SessionPhase } from '../src/game/modes/types';

/** 応援モードの性格を壊す表現。メッセージ資産に混入させない */
const NG_WORDS = [
  '痩せる',
  '絶対成功',
  'もっと追い込めないの',
  '動きが正確',
  '20回できた',
  'カロリー消費',
  '体型',
  '医療効果',
  '治る',
  '効果を保証',
  '失敗',
  'ダメ',
];

const PHASES: readonly (SessionPhase | 'any')[] = [
  'start',
  'warmup',
  'keep',
  'push',
  'finish',
  'any',
];
const TONES = ['gentle', 'energetic', 'focused', 'calm'] as const;

describe('messageBank 品質', () => {
  it('231件以上ある（v0.2正式版時点の資産を下回らない）', () => {
    expect(messageBank.length).toBeGreaterThanOrEqual(231);
  });

  it('id が重複していない', () => {
    const ids = new Set(messageBank.map((m) => m.id));
    expect(ids.size).toBe(messageBank.length);
  });

  it('text が空でない', () => {
    for (const m of messageBank) {
      expect(m.text.trim().length, `id=${m.id}`).toBeGreaterThan(0);
    }
  });

  it('同一 text が重複していない', () => {
    const texts = new Set(messageBank.map((m) => m.text));
    expect(texts.size).toBe(messageBank.length);
  });

  it('phase / tone / intensity が定義済み範囲に収まっている', () => {
    for (const m of messageBank) {
      expect(PHASES, `id=${m.id} phase`).toContain(m.phase);
      expect(TONES, `id=${m.id} tone`).toContain(m.tone);
      expect(m.intensity, `id=${m.id} intensity`).toBeGreaterThanOrEqual(1);
      expect(m.intensity, `id=${m.id} intensity`).toBeLessThanOrEqual(5);
    }
  });

  it('各フェーズに十分なメッセージがある（any込みで20件以上、専用8件以上）', () => {
    const phases: SessionPhase[] = ['start', 'warmup', 'keep', 'push', 'finish'];
    for (const phase of phases) {
      const dedicated = messageBank.filter((m) => m.phase === phase);
      const usable = messageBank.filter((m) => m.phase === phase || m.phase === 'any');
      expect(dedicated.length, `phase=${phase} 専用`).toBeGreaterThanOrEqual(8);
      expect(usable.length, `phase=${phase} 利用可能`).toBeGreaterThanOrEqual(20);
    }
  });

  it('主要トーンが偏りすぎていない（各10件以上、全体の6割未満）', () => {
    for (const tone of TONES) {
      const count = messageBank.filter((m) => m.tone === tone).length;
      expect(count, `tone=${tone}`).toBeGreaterThanOrEqual(10);
      expect(count / messageBank.length, `tone=${tone} 比率`).toBeLessThan(0.6);
    }
  });

  it('NGワードを含まない', () => {
    for (const m of messageBank) {
      for (const ng of NG_WORDS) {
        expect(m.text.includes(ng), `id=${m.id} text="${m.text}" NG="${ng}"`).toBe(false);
      }
    }
  });
});
