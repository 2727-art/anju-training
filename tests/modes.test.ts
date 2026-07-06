import { describe, expect, it } from 'vitest';
import { supportMode } from '../src/game/modes/supportMode';
import { survivalMode } from '../src/game/modes/survivalMode';
import { allModes, getMode } from '../src/game/modes/modeRegistry';

describe('応援モード', () => {
  it('有効で、session plan を生成できる', () => {
    expect(supportMode.isEnabled).toBe(true);
    const plan = supportMode.createSessionPlan({ durationSec: 90, seed: 5 });
    expect(plan.modeId).toBe('support');
    expect(plan.missions.length).toBeGreaterThan(0);
    expect(plan.events.length).toBeGreaterThan(0);
    expect(plan.phases.length).toBe(5);
  });

  it('同じシードなら同じプランになる', () => {
    const a = supportMode.createSessionPlan({ durationSec: 60, seed: 11 });
    const b = supportMode.createSessionPlan({ durationSec: 60, seed: 11 });
    expect(a.missions.map((m) => m.label)).toEqual(b.missions.map((m) => m.label));
  });
});

describe('サバイバルモード（スタブ）', () => {
  it('存在し、isEnabled: false である', () => {
    expect(survivalMode.id).toBe('survival');
    expect(survivalMode.isEnabled).toBe(false);
  });

  it('レジストリに登録されている', () => {
    expect(allModes.some((m) => m.id === 'survival')).toBe(true);
    expect(getMode('survival')).toBe(survivalMode);
  });
});
