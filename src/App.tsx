import { useCallback, useMemo, useReducer, useRef } from 'react';
import { appReducer, initialAppState } from './app/appState';
import type { GameModeId, SessionOptions } from './game/modes/types';
import { defaultSessionOptions } from './game/modes/types';
import { getMode } from './game/modes/modeRegistry';
import type { SelectedVideo } from './video/videoTypes';
import { revokeVideoUrl } from './video/objectUrl';
import { calculateResult, type SessionStats } from './game/result/resultCalculator';
import { VideoPicker } from './components/VideoPicker/VideoPicker';
import { VideoStage } from './components/VideoStage/VideoStage';
import { ResultScreen } from './components/ResultScreen/ResultScreen';
import { OrientationBanner } from './components/OrientationBanner/OrientationBanner';
import { DebugHudScreen } from './components/DebugHud/DebugHudScreen';
import { parseDebugHud } from './app/debugHud';
import { viewportClasses } from './app/viewport';
import { useViewport } from './hooks/useViewport';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  // 「もう一度プレイ」でも同じトーン・頻度設定を使うために保持する
  const optionsRef = useRef<SessionOptions>(defaultSessionOptions);

  const handleReady = useCallback(
    (video: SelectedVideo, modeId: GameModeId, options: SessionOptions) => {
      optionsRef.current = options;
      const plan = getMode(modeId).createSessionPlan({
        durationSec: video.metadata.durationSec,
        options,
      });
      dispatch({ type: 'startSession', video, plan });
    },
    [],
  );

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
      options: optionsRef.current,
    });
    dispatch({ type: 'replay', plan });
  }, [state.video, state.plan]);

  const handlePickAnother = useCallback(() => {
    revokeVideoUrl(state.video?.objectUrl);
    dispatch({ type: 'pickAnother' });
  }, [state.video]);

  const viewport = useViewport();
  // HUDデバッグモード（?debugHud=1）。設定はURLのみで、localStorageには保存しない
  const debugHud = useMemo(
    () => parseDebugHud(typeof window === 'undefined' ? '' : window.location.search),
    [],
  );

  const rootClass = ['app-root', ...viewportClasses(viewport)].join(' ');

  if (debugHud.enabled) {
    return (
      <div className={rootClass}>
        <div className="app-frame">
          <OrientationBanner />
          <DebugHudScreen config={debugHud} />
        </div>
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <div className="app-frame">
        <OrientationBanner />
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
