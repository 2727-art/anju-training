import { describe, expect, it } from 'vitest';
import { calculateResult, titleContextOf } from '../src/game/result/resultCalculator';
import { pickTitle, resultTitles, type TitleContext } from '../src/game/result/resultTitles';
import { supportMode } from '../src/game/modes/supportMode';

function ctx(patch: Partial<TitleContext> = {}): TitleContext {
  return {
    durationSec: 60,
    missionCount: 5,
    maxCombo: 1,
    shownMessageCount: 5,
    tonePreference: 'auto',
    messageFrequency: 'normal',
    ...patch,
  };
}

/** 称号に混入させない表現（実測成果・身体評価・医療効果を示す語） */
const TITLE_NG = ['KCAL', 'CALORIE', 'BURN', 'DIET', 'WEIGHT', 'REP', 'ACCURATE', 'EXACT', '痩', '回', '正確'];

describe('resultTitles（称号バンク）', () => {
  it('30件以上ある', () => {
    expect(resultTitles.length).toBeGreaterThanOrEqual(30);
  });

  it('label / id が空でなく、重複していない', () => {
    const ids = new Set(resultTitles.map((t) => t.id));
    const labels = new Set(resultTitles.map((t) => t.label));
    expect(ids.size).toBe(resultTitles.length);
    expect(labels.size).toBe(resultTitles.length);
    for (const t of resultTitles) {
      expect(t.id.trim().length).toBeGreaterThan(0);
      expect(t.label.trim().length).toBeGreaterThan(0);
    }
  });

  it('NGワード・実測を示す表現・数字を含まない', () => {
    for (const t of resultTitles) {
      for (const ng of TITLE_NG) {
        expect(t.label.toUpperCase().includes(ng), `label=${t.label} NG=${ng}`).toBe(false);
      }
      expect(/\d/.test(t.label), `label=${t.label} に数字`).toBe(false);
    }
  });

  it('各トーン向けの称号が1件以上ある', () => {
    for (const tone of ['gentle', 'energetic', 'focused', 'calm'] as const) {
      const matched = resultTitles.filter((t) => t.matches(ctx({ tonePreference: tone })));
      expect(matched.length, `tone=${tone}`).toBeGreaterThanOrEqual(1);
    }
  });

  it('表示頻度に応じた称号候補が選べる', () => {
    expect(pickTitle(ctx({ messageFrequency: 'high' }))).toMatch(
      /CHEER|SUPPORT/,
    );
    expect(pickTitle(ctx({ messageFrequency: 'low' }))).toMatch(/STEADY|SMOOTH/);
  });

  it('尺に応じた称号候補が選べる', () => {
    expect(pickTitle(ctx({ durationSec: 320 }))).toBe('EPIC JOURNEY');
    expect(pickTitle(ctx({ durationSec: 150 }))).toBe('LONG RUN FINISHER');
    expect(['QUICK STARTER', 'CLEAR STEP']).toContain(pickTitle(ctx({ durationSec: 20, shownMessageCount: 3 })));
  });

  it('トーンに応じた称号候補が選べる', () => {
    expect(['GENTLE FINISH', 'SOFT LANDING', 'PACE FRIEND']).toContain(
      pickTitle(ctx({ tonePreference: 'gentle' })),
    );
    expect(['CALM SESSION', 'QUIET COMPLETE']).toContain(
      pickTitle(ctx({ tonePreference: 'calm' })),
    );
  });

  it('全ミッション相当のコンボ + 長尺で PERFECT MARATHON', () => {
    expect(pickTitle(ctx({ durationSec: 200, missionCount: 8, maxCombo: 8 }))).toBe(
      'PERFECT MARATHON',
    );
  });

  it('候補が乏しいコンテキストでもフォールバック称号を返す', () => {
    const title = pickTitle(
      ctx({ durationSec: 40, missionCount: 0, maxCombo: 0, shownMessageCount: 0 }),
    );
    expect(['NICE KEEP', 'YOUR PACE CLEAR', 'GOOD SESSION', 'DAILY FLOW']).toContain(title);
  });
});

describe('calculateResult', () => {
  it('完走事実に基づく値のみ返し、称号はプラン設定を反映する', () => {
    const plan = supportMode.createSessionPlan({
      durationSec: 90,
      seed: 1,
      options: { tonePreference: 'gentle', messageFrequency: 'normal' },
    });
    const result = calculateResult(plan, { maxCombo: 1, shownMessageCount: 5 });
    expect(result.modeLabel).toBe('応援モード');
    expect(result.durationSec).toBe(90);
    expect(result.missionCount).toBe(plan.missions.length);
    expect(result.title.length).toBeGreaterThan(0);

    const context = titleContextOf(plan, { maxCombo: 1, shownMessageCount: 5 });
    expect(context.tonePreference).toBe('gentle');
    expect(context.messageFrequency).toBe('normal');
  });
});
