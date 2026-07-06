import { describe, expect, it } from 'vitest';
import { buildPhaseWindows, generateMissions } from '../src/game/mission/missionGenerator';
import { buildTimeline } from '../src/game/timeline/timelineScheduler';
import { createRandom } from '../src/utils/random';

function makeTimeline(durationSec: number, seed = 7) {
  const rand = createRandom(seed);
  const phases = buildPhaseWindows(durationSec);
  const missions = generateMissions(durationSec, rand);
  return buildTimeline({ durationSec, phases, missions, rand });
}

describe('buildTimeline', () => {
  it('イベントは time の昇順で並ぶ', () => {
    const events = makeTimeline(120);
    for (let i = 1; i < events.length; i++) {
      expect(events[i].time).toBeGreaterThanOrEqual(events[i - 1].time);
    }
  });

  it('同一時刻に密集しない（最小0.05秒の間隔）', () => {
    const events = makeTimeline(60);
    for (let i = 1; i < events.length; i++) {
      expect(events[i].time - events[i - 1].time).toBeGreaterThanOrEqual(0.049);
    }
  });

  it('フェーズ切替・ミッション・メッセージが含まれる', () => {
    const events = makeTimeline(90);
    const types = new Set(events.map((e) => e.type));
    expect(types.has('phase:change')).toBe(true);
    expect(types.has('mission:start')).toBe(true);
    expect(types.has('mission:clear')).toBe(true);
    expect(types.has('message:show')).toBe(true);
    expect(types.has('combo:up')).toBe(true);
    expect(types.has('gauge:update')).toBe(true);
  });

  it('FEVER と LAST PUSH のカットインが入る', () => {
    const events = makeTimeline(120);
    const callouts = events.filter((e) => e.type === 'callout:show');
    const texts = callouts.map((c) => (c.type === 'callout:show' ? c.text : ''));
    expect(texts).toContain('FEVER');
    expect(texts).toContain('LAST PUSH');
  });

  it('極端に短い・長い動画でも生成できる', () => {
    expect(makeTimeline(8).length).toBeGreaterThan(0);
    expect(makeTimeline(1800).length).toBeGreaterThan(0);
  });
});
