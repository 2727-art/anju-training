import { describe, expect, it } from 'vitest';
import {
  CALLOUT_DURATION_MS,
  CALLOUT_PRIORITY,
  calloutClassName,
  kindOfCalloutText,
  shouldReplaceCallout,
} from '../src/game/hud/calloutQueue';

describe('中央カットインの優先度制御', () => {
  it('FINISH > LAST_PUSH > FEVER > CLEAR の優先度', () => {
    expect(CALLOUT_PRIORITY.finish).toBeGreaterThan(CALLOUT_PRIORITY.lastpush);
    expect(CALLOUT_PRIORITY.lastpush).toBeGreaterThan(CALLOUT_PRIORITY.fever);
    expect(CALLOUT_PRIORITY.fever).toBeGreaterThan(CALLOUT_PRIORITY.clear);
  });

  it('表示テキストから種別を判定できる', () => {
    expect(kindOfCalloutText('CLEAR')).toBe('clear');
    expect(kindOfCalloutText('FEVER')).toBe('fever');
    expect(kindOfCalloutText('LAST PUSH')).toBe('lastpush');
    expect(kindOfCalloutText('FINISH')).toBe('finish');
  });

  it('近接イベントで低優先度は表示中の高優先度を潰さない', () => {
    const finish = { kind: 'finish', text: 'FINISH' } as const;
    const clear = { kind: 'clear', text: 'CLEAR' } as const;
    expect(shouldReplaceCallout(finish, clear)).toBe(false);
  });

  it('LAST PUSH表示中にFINISHが来たらFINISHが優先される', () => {
    const lastpush = { kind: 'lastpush', text: 'LAST PUSH' } as const;
    const finish = { kind: 'finish', text: 'FINISH' } as const;
    expect(shouldReplaceCallout(lastpush, finish)).toBe(true);
  });

  it('表示なしの時は常に表示する', () => {
    expect(shouldReplaceCallout(null, { kind: 'clear', text: 'CLEAR' })).toBe(true);
  });

  it('表示時間が700〜1200msの範囲（FINISHのみ長めを許容）', () => {
    for (const kind of ['clear', 'fever', 'lastpush'] as const) {
      expect(CALLOUT_DURATION_MS[kind]).toBeGreaterThanOrEqual(700);
      expect(CALLOUT_DURATION_MS[kind]).toBeLessThanOrEqual(1200);
    }
    expect(CALLOUT_DURATION_MS.finish).toBeGreaterThanOrEqual(700);
    expect(CALLOUT_DURATION_MS.finish).toBeLessThanOrEqual(2000);
  });

  it('reduced motion時に演出classが静的表示に切り替わる', () => {
    expect(calloutClassName(false)).toContain('is-animated');
    expect(calloutClassName(true)).toContain('is-static');
    expect(calloutClassName(true)).not.toContain('is-animated');
  });
});
