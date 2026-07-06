import type { Mission } from './missionTypes';
import type { PhaseWindow, SessionPhase } from '../modes/types';
import { missionTemplates } from './missionTemplates';
import { pickOne } from '../../utils/random';

/** フェーズ境界（動画尺に対する割合） */
const PHASE_RATIOS: ReadonlyArray<{ phase: SessionPhase; from: number; to: number }> = [
  { phase: 'start', from: 0, to: 0.1 },
  { phase: 'warmup', from: 0.1, to: 0.3 },
  { phase: 'keep', from: 0.3, to: 0.6 },
  { phase: 'push', from: 0.6, to: 0.85 },
  { phase: 'finish', from: 0.85, to: 1 },
];

export function buildPhaseWindows(durationSec: number): PhaseWindow[] {
  return PHASE_RATIOS.map(({ phase, from, to }) => ({
    phase,
    startTime: durationSec * from,
    endTime: durationSec * to,
  }));
}

export function phaseAt(phases: readonly PhaseWindow[], time: number): SessionPhase {
  for (const w of phases) {
    if (time < w.endTime) return w.phase;
  }
  return 'finish';
}

/** 尺（秒）からミッション数を決める */
export function missionCountFor(durationSec: number): number {
  if (durationSec < 15) return Math.max(1, Math.floor(durationSec / 8));
  if (durationSec < 30) return 2 + Math.floor((durationSec - 15) / 8); // 2〜3
  if (durationSec < 60) return 4 + Math.floor((durationSec - 30) / 15); // 4〜5
  if (durationSec < 120) return 6 + Math.floor((durationSec - 60) / 15); // 6〜9
  if (durationSec < 180) return 10 + Math.floor((durationSec - 120) / 15); // 10〜13
  // 180秒以上: 30秒前後ごとの章構成
  return Math.round(durationSec / 30);
}

/**
 * 動画尺だけを使ってオート進行ミッションを生成する。
 * 動画内容の解析は行わない。
 */
export function generateMissions(durationSec: number, rand: () => number): Mission[] {
  const count = missionCountFor(durationSec);
  const phases = buildPhaseWindows(durationSec);
  const missions: Mission[] = [];

  // 冒頭と末尾に少し余白を残して均等配置する
  const usableStart = durationSec * 0.03;
  const usableEnd = durationSec * 0.97;
  const slot = (usableEnd - usableStart) / count;

  for (let i = 0; i < count; i++) {
    const startTime = usableStart + slot * i;
    const endTime = startTime + slot * 0.9;
    const phase = phaseAt(phases, startTime);
    missions.push({
      id: `mission-${i + 1}`,
      label: pickOne(missionTemplates[phase], rand),
      phase,
      startTime,
      endTime,
    });
  }
  return missions;
}
