import type { CreateSessionPlanInput, ModeEngine, SessionPlan } from './types';
import { buildPhaseWindows } from '../mission/missionGenerator';

/**
 * サバイバルモード（Coming soon）。
 * v0.4 で有効化予定。DANGERゲージ・耐久タイムライン・LAST STAND演出などを
 * このエンジン内に実装する。UI側は isEnabled: false の間は選択不可にする。
 */
export const survivalMode: ModeEngine = {
  id: 'survival',
  label: 'サバイバルモード',
  description: 'Coming soon — 耐久系の拡張モード（開発予定）',
  isEnabled: false,

  // TODO(v0.4): 耐久タイムライン生成を実装する。現在は空プランのスタブ。
  createSessionPlan(input: CreateSessionPlanInput): SessionPlan {
    return {
      modeId: 'survival',
      durationSec: input.durationSec,
      phases: buildPhaseWindows(input.durationSec),
      missions: [],
      events: [],
    };
  },
};
