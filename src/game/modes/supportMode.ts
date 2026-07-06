import type { CreateSessionPlanInput, ModeEngine, SessionPlan } from './types';
import { defaultSessionOptions } from './types';
import { buildPhaseWindows, generateMissions } from '../mission/missionGenerator';
import { buildTimeline } from '../timeline/timelineScheduler';
import { createRandom } from '../../utils/random';

/**
 * 応援モード。
 * 失敗しない・責めない・自己ペースを肯定するメインモード。
 */
export const supportMode: ModeEngine = {
  id: 'support',
  label: '応援モード',
  description: 'あなたのペースに合わせて進行する応援型トレーニング。失敗判定はありません。',
  isEnabled: true,

  createSessionPlan(input: CreateSessionPlanInput): SessionPlan {
    const seed = input.seed ?? Math.floor(Math.random() * 2 ** 31);
    const rand = createRandom(seed);
    const durationSec = input.durationSec;

    const options = { ...defaultSessionOptions, ...input.options };
    const phases = buildPhaseWindows(durationSec);
    const missions = generateMissions(durationSec, rand);
    const events = buildTimeline({
      durationSec,
      phases,
      missions,
      rand,
      tonePreference: options.tonePreference,
      messageFrequency: options.messageFrequency,
    });

    return { modeId: 'support', durationSec, phases, missions, events, options };
  },
};
