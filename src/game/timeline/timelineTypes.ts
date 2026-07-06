import type { SessionPhase } from '../modes/types';

/** タイムライン上で発火するイベント種別 */
export type TimelineEventType =
  | 'mission:start'
  | 'mission:clear'
  | 'message:show'
  | 'combo:up'
  | 'gauge:update'
  | 'callout:show'
  | 'phase:change';

export interface TimelineEventBase {
  id: string;
  type: TimelineEventType;
  /** 動画の currentTime（秒）。イベント配列は必ずこの値の昇順に並ぶ */
  time: number;
}

export interface MissionStartEvent extends TimelineEventBase {
  type: 'mission:start';
  missionId: string;
  label: string;
}

export interface MissionClearEvent extends TimelineEventBase {
  type: 'mission:clear';
  missionId: string;
}

export interface MessageShowEvent extends TimelineEventBase {
  type: 'message:show';
  messageId: string;
  text: string;
}

export interface ComboUpEvent extends TimelineEventBase {
  type: 'combo:up';
}

export interface GaugeUpdateEvent extends TimelineEventBase {
  type: 'gauge:update';
  /** 0〜1 のセッション進行度 */
  value: number;
}

export interface CalloutShowEvent extends TimelineEventBase {
  type: 'callout:show';
  /** CLEAR / FEVER / LAST PUSH など短い演出テキスト */
  text: string;
}

export interface PhaseChangeEvent extends TimelineEventBase {
  type: 'phase:change';
  phase: SessionPhase;
}

export type TimelineEvent =
  | MissionStartEvent
  | MissionClearEvent
  | MessageShowEvent
  | ComboUpEvent
  | GaugeUpdateEvent
  | CalloutShowEvent
  | PhaseChangeEvent;
