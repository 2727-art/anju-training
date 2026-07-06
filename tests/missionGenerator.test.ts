import { describe, expect, it } from 'vitest';
import { generateMissions, missionCountFor } from '../src/game/mission/missionGenerator';
import { createRandom } from '../src/utils/random';

describe('missionCountFor（尺→ミッション数）', () => {
  it('15〜30秒は2〜4個', () => {
    expect(missionCountFor(15)).toBeGreaterThanOrEqual(2);
    expect(missionCountFor(29)).toBeLessThanOrEqual(4);
  });

  it('30〜60秒は4〜6個', () => {
    expect(missionCountFor(30)).toBeGreaterThanOrEqual(4);
    expect(missionCountFor(59)).toBeLessThanOrEqual(6);
  });

  it('60〜120秒は6〜10個', () => {
    expect(missionCountFor(60)).toBeGreaterThanOrEqual(6);
    expect(missionCountFor(119)).toBeLessThanOrEqual(10);
  });

  it('120〜180秒は10〜14個', () => {
    expect(missionCountFor(120)).toBeGreaterThanOrEqual(10);
    expect(missionCountFor(179)).toBeLessThanOrEqual(14);
  });

  it('180秒以上は約30秒ごと', () => {
    expect(missionCountFor(300)).toBe(10);
    expect(missionCountFor(600)).toBe(20);
  });

  it('極端に短い動画でも1個以上', () => {
    expect(missionCountFor(5)).toBeGreaterThanOrEqual(1);
  });
});

describe('generateMissions', () => {
  it('ミッションは開始時刻の昇順で尺の範囲内に収まる', () => {
    const rand = createRandom(42);
    const missions = generateMissions(90, rand);
    for (let i = 1; i < missions.length; i++) {
      expect(missions[i].startTime).toBeGreaterThan(missions[i - 1].startTime);
    }
    for (const m of missions) {
      expect(m.startTime).toBeGreaterThanOrEqual(0);
      expect(m.endTime).toBeLessThanOrEqual(90);
      expect(m.label.length).toBeGreaterThan(0);
    }
  });

  it('長尺（10分）でも壊れない', () => {
    const missions = generateMissions(600, createRandom(1));
    expect(missions.length).toBe(20);
  });
});
