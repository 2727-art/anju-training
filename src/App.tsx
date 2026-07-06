import { useCallback, useReducer } from 'react';
import { appReducer, initialAppState } from './app/appState';
import type { GameModeId } from './game/modes/types';
import { getMode } from './game/modes/modeRegistry';
import type { SelectedVideo } from './video/videoTypes';
import { revokeVideoUrl } from './video/objectUrl';
import { calculateResult, type SessionStats } from './game/result/resultCalculator';
import { VideoPicker } from './components/VideoPicker/VideoPicker';
import { VideoStage } from './components/VideoStage/VideoStage';
import { ResultScreen } from './components/ResultScreen/ResultScreen';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const handleReady = useCallback((video: SelectedVideo, modeId: GameModeId) => {
    const plan = getMode(modeId).createSessionPlan({
      durationSec: video.metadata.durationSec,
    });
    dispatch({ type: 'startSession', video, plan });
  }, []);

  const handleFinish = useCallback(
    (stats: SessionStats) => {
      if (!state.plan) return;
      dispatch({ type: 'finishSession', result: calculateResult(state.plan, stats) });
    },
    [state.plan],
  );

  const handleReplay = useCallback(() => {
    if (!state.video || !state.plan) return;
    // 新しいプランを生成してメッセージの並びを変える
    const plan = getMode(state.plan.modeId).createSessionPlan({
      durationSec: state.video.metadata.durationSec,
    });
    dispatch({ type: 'replay', plan });
  }, [state.video, state.plan]);

  const handlePickAnother = useCallback(() => {
    revokeVideoUrl(state.video?.objectUrl);
    dispatch({ type: 'pickAnother' });
  }, [state.video]);

  return (
    <div className="app-root">
      <div className="app-frame">
        {state.screen === 'pick' && <VideoPicker onReady={handleReady} />}
        {state.screen === 'play' && state.video && state.plan && (
          <VideoStage video={state.video} plan={state.plan} onFinish={handleFinish} />
        )}
        {state.screen === 'result' && state.result && (
          <ResultScreen
            result={state.result}
            onReplay={handleReplay}
            onPickAnother={handlePickAnother}
          />
        )}
      </div>
    </div>
  );
}
