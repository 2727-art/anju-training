import { useCallback, useReducer } from 'react';
import type { SessionPhase } from '../game/modes/types';
import type { TimelineEvent } from '../game/timeline/timelineTypes';

export interface HudState {
  phase: SessionPhase;
  missionLabel: string | null;
  message: string | null;
  messageKey: number;
  combo: number;
  maxCombo: number;
  gauge: number;
  callout: string | null;
  calloutKey: number;
  shownMessageCount: number;
}

const initialHud: HudState = {
  phase: 'start',
  missionLabel: null,
  message: null,
  messageKey: 0,
  combo: 0,
  maxCombo: 0,
  gauge: 0,
  callout: null,
  calloutKey: 0,
  shownMessageCount: 0,
};

type HudAction = { type: 'event'; ev: TimelineEvent } | { type: 'reset' } | { type: 'clearCallout' };

function reducer(state: HudState, action: HudAction): HudState {
  if (action.type === 'reset') return initialHud;
  if (action.type === 'clearCallout') return { ...state, callout: null };
  const ev = action.ev;
  switch (ev.type) {
    case 'phase:change':
      return { ...state, phase: ev.phase };
    case 'mission:start':
      return { ...state, missionLabel: ev.label };
    case 'mission:clear':
      return {
        ...state,
        missionLabel: null,
        callout: 'CLEAR',
        calloutKey: state.calloutKey + 1,
      };
    case 'combo:up': {
      const combo = state.combo + 1;
      return { ...state, combo, maxCombo: Math.max(state.maxCombo, combo) };
    }
    case 'gauge:update':
      return { ...state, gauge: ev.value };
    case 'message:show':
      return {
        ...state,
        message: ev.text,
        messageKey: state.messageKey + 1,
        shownMessageCount: state.shownMessageCount + 1,
      };
    case 'callout:show':
      return { ...state, callout: ev.text, calloutKey: state.calloutKey + 1 };
    default:
      return state;
  }
}

/** 再生セッション中のHUD状態を、タイムラインイベントから組み立てる */
export function useVideoSession() {
  const [hud, dispatch] = useReducer(reducer, initialHud);

  const applyEvent = useCallback((ev: TimelineEvent) => dispatch({ type: 'event', ev }), []);
  const resetSession = useCallback(() => dispatch({ type: 'reset' }), []);
  const clearCallout = useCallback(() => dispatch({ type: 'clearCallout' }), []);

  return { hud, applyEvent, resetSession, clearCallout };
}
