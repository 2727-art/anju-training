import { describe, expect, it } from 'vitest';
import { survivalMode } from '../src/game/modes/survivalMode';
import { allModes } from '../src/game/modes/modeRegistry';

describe('サバイバルモード無効維持（v0.2）', () => {
  it('isEnabled が false のまま', () => {
    expect(survivalMode.isEnabled).toBe(false);
  });

  it('説明が Coming soon を含む', () => {
    expect(survivalMode.description).toContain('Coming soon');
  });

  it('UI（ModeSelect）は isEnabled: false のモードを選択不可にする前提を満たす', () => {
    // ModeSelect は mode.isEnabled で disabled を制御している。
    // レジストリ上で survival が無効であることを担保する。
    const survival = allModes.find((m) => m.id === 'survival');
    expect(survival).toBeDefined();
    expect(survival?.isEnabled).toBe(false);
  });

  it('createSessionPlan は本実装されておらず、空プランを返すスタブのまま', () => {
    const plan = survivalMode.createSessionPlan({ durationSec: 60 });
    expect(plan.missions).toEqual([]);
    expect(plan.events).toEqual([]);
  });
});
