import type { TimelineEvent } from '../timeline/timelineTypes';
import type { Mission } from '../mission/missionTypes';
import type { MessageTone } from '../messages/messageTypes';

export type GameModeId = 'support' | 'survival';

/** セッションの進行フェーズ。動画尺に対する割合で切り替わる */
export type SessionPhase = 'start' | 'warmup' | 'keep' | 'push' | 'finish';

export interface PhaseWindow {
  phase: SessionPhase;
  /** フェーズ開始時刻（秒） */
  startTime: number;
  /** フェーズ終了時刻（秒） */
  endTime: number;
}

/** 応援トーンの好み。'auto' はフェーズに合わせたおまかせ */
export type TonePreference = MessageTone | 'auto';

/** 応援メッセージの表示頻度 */
export type MessageFrequency = 'low' | 'normal' | 'high';

export interface SessionOptions {
  tonePreference: TonePreference;
  messageFrequency: MessageFrequency;
}

export const defaultSessionOptions: SessionOptions = {
  tonePreference: 'auto',
  messageFrequency: 'normal',
};

export interface CreateSessionPlanInput {
  /** 動画の尺（秒） */
  durationSec: number;
  /** 乱数シード。省略時はランダム */
  seed?: number;
  /** トーン・頻度などのユーザー設定。省略時は defaultSessionOptions */
  options?: Partial<SessionOptions>;
}

export interface SessionPlan {
  modeId: GameModeId;
  durationSec: number;
  phases: PhaseWindow[];
  missions: Mission[];
  /** time 昇順に整列済みのタイムラインイベント */
  events: TimelineEvent[];
  /** プラン生成に使ったユーザー設定。称号選定にも使う */
  options: SessionOptions;
}

/**
 * モードごとの実装を分離するエンジンインターフェース。
 * サバイバルモードなど新モードは、このインターフェースを実装して
 * modeRegistry に登録するだけで追加できる。
 */
export interface ModeEngine {
  id: GameModeId;
  label: string;
  description: string;
  isEnabled: boolean;
  createSessionPlan(input: CreateSessionPlanInput): SessionPlan;
}
