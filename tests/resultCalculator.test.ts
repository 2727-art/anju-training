import { describe, expect, it } from 'vitest';
import { calculateResult, pickTitle } from '../src/game/result/resultCalculator';
import { supportMode } from '../src/game/modes/supportMode';

function planFor(durationSec: number) {
  return supportMode.createSessionPlan({ durationSec, seed: 1 });
}

describe('pickTitle（称号バリエーション）', () => {
  it('全ミッション相当のコンボ + 長尺で PERFECT MARATHON', () => {
    const plan = planFor(200);
    expect(pickTitle(plan, { maxCombo: plan.missions.length, shownMessageCount: 5 })).toBe(
      'PERFECT MARATHON',
    );
  });

  it('全ミッション相当のコンボで FULL SUPPORT CLEAR', () => {
    const plan = planFor(60);
    expect(pickTitle(plan, { maxCombo: plan.missions.length, shownMessageCount: 5 })).toBe(
      'FULL SUPPORT CLEAR',
    );
  });

  it('300秒以上で EPIC JOURNEY', () => {
    expect(pickTitle(planFor(320), { maxCombo: 1, shownMessageCount: 5 })).toBe('EPIC JOURNEY');
  });

  it('120秒以上 + コンボ5以上で LONG RUN MASTER', () => {
    expect(pickTitle(planFor(150), { maxCombo: 5, shownMessageCount: 5 })).toBe('LONG RUN MASTER');
  });

  it('120秒以上で LONG RUN FINISHER', () => {
    expect(pickTitle(planFor(150), { maxCombo: 1, shownMessageCount: 5 })).toBe(
      'LONG RUN FINISHER',
    );
  });

  it('コンボ6以上で COMBO RIDER', () => {
    expect(pickTitle(planFor(90), { maxCombo: 6, shownMessageCount: 5 })).toBe('COMBO RIDER');
  });

  it('コンボ3以上で GOOD FLOW', () => {
    expect(pickTitle(planFor(90), { maxCombo: 3, shownMessageCount: 5 })).toBe('GOOD FLOW');
  });

  it('メッセージ15件以上で CHEER COLLECTOR', () => {
    expect(pickTitle(planFor(90), { maxCombo: 1, shownMessageCount: 15 })).toBe('CHEER COLLECTOR');
  });

  it('30秒未満で QUICK STARTER', () => {
    expect(pickTitle(planFor(20), { maxCombo: 1, shownMessageCount: 3 })).toBe('QUICK STARTER');
  });

  it('デフォルトは NICE KEEP', () => {
    expect(pickTitle(planFor(60), { maxCombo: 1, shownMessageCount: 5 })).toBe('NICE KEEP');
  });
});

describe('calculateResult', () => {
  it('完走事実に基づく値のみ返す', () => {
    const plan = planFor(90);
    const result = calculateResult(plan, { maxCombo: 4, shownMessageCount: 9 });
    expect(result.modeLabel).toBe('応援モード');
    expect(result.durationSec).toBe(90);
    expect(result.missionCount).toBe(plan.missions.length);
    expect(result.messageCount).toBe(9);
    expect(result.maxCombo).toBe(4);
    expect(result.title.length).toBeGreaterThan(0);
  });
});
