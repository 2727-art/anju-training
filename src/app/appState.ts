import type { ScreenId } from './screenTypes';
import type { SelectedVideo } from '../video/videoTypes';
import type { SessionPlan } from '../game/modes/types';
import type { SessionResult } from '../game/result/resultTypes';

export interface AppState {
  screen: ScreenId;
  video: SelectedVideo | null;
  plan: SessionPlan | null;
  result: SessionResult | null;
}

export const initialAppState: AppState = {
  screen: 'pick',
  video: null,
  plan: null,
  result: null,
};

export type AppAction =
  | { type: 'startSession'; video: SelectedVideo; plan: SessionPlan }
  | { type: 'finishSession'; result: SessionResult }
  | { type: 'replay'; plan: SessionPlan }
  | { type: 'pickAnother' };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'startSession':
      return { screen: 'play', video: action.video, plan: action.plan, result: null };
    case 'finishSession':
      return { ...state, screen: 'result', result: action.result };
    case 'replay':
      return { ...state, screen: 'play', plan: action.plan, result: null };
    case 'pickAnother':
      return { ...initialAppState };
    default:
      return state;
  }
}
