import { describe, expect, it } from 'vitest';
import { desiredIntensity, selectMessage } from '../src/game/messages/messageSelector';
import { messageBank } from '../src/game/messages/messageBank';
import { createRandom } from '../src/utils/random';

describe('messageBank', () => {
  it('100件以上のメッセージがある', () => {
    expect(messageBank.length).toBeGreaterThanOrEqual(100);
  });

  it('IDが重複しない', () => {
    const ids = new Set(messageBank.map((m) => m.id));
    expect(ids.size).toBe(messageBank.length);
  });
});

describe('selectMessage', () => {
  it('直近に出したメッセージを繰り返さない', () => {
    const rand = createRandom(3);
    const recentIds: string[] = [];
    for (let i = 0; i < 20; i++) {
      const m = selectMessage({ phase: 'keep', progress: 0.5, recentIds, rand });
      expect(recentIds).not.toContain(m.id);
      recentIds.push(m.id);
      if (recentIds.length > 8) recentIds.shift();
    }
  });

  it('他フェーズ専用メッセージを選ばない', () => {
    const rand = createRandom(9);
    for (let i = 0; i < 30; i++) {
      const m = selectMessage({ phase: 'start', progress: 0.05, recentIds: [], rand });
      expect(['start', 'any']).toContain(m.phase);
    }
  });

  it('後半ほど desiredIntensity が高くなる', () => {
    expect(desiredIntensity(0)).toBe(1);
    expect(desiredIntensity(0.5)).toBe(3);
    expect(desiredIntensity(1)).toBe(5);
  });
});
