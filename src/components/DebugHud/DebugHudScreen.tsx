import { useCallback, useMemo, useState } from 'react';
import type { DebugHudConfig } from '../../app/debugHud';
import type { HudState } from '../../hooks/useVideoSession';
import { Hud } from '../Hud/Hud';
import { missionTemplates } from '../../game/mission/missionTemplates';
import { selectMessage } from '../../game/messages/messageSelector';
import { createRandom } from '../../utils/random';
import './DebugHudScreen.css';

/** フェーズごとの代表的な進行度（ゲージ・intensity選定用） */
const PHASE_PROGRESS: Record<string, number> = {
  start: 0.05,
  warmup: 0.2,
  keep: 0.45,
  push: 0.72,
  finish: 0.92,
};

const CALLOUT_TEXT: Record<string, string> = {
  clear: 'CLEAR',
  fever: 'FEVER',
  lastpush: 'LAST PUSH',
  finish: 'FINISH',
};

/**
 * HUDデバッグ画面（?debugHud=1）。
 * 実動画なしでHUDの見た目を再現する開発用スクリーン。
 * 設定はURLクエリのみで、localStorageには何も保存しない。
 */
export function DebugHudScreen({ config }: { config: DebugHudConfig }) {
  const [calloutTick, setCalloutTick] = useState(0);

  const hud: HudState = useMemo(() => {
    const progress = PHASE_PROGRESS[config.phase] ?? 0.5;
    const rand = createRandom(42);
    const message = selectMessage({
      phase: config.phase,
      progress,
      recentIds: [],
      rand,
      tonePreference: config.tone,
    });
    return {
      phase: config.phase,
      missionLabel: missionTemplates[config.phase][0],
      message: message.text,
      messageKey: 1,
      combo: 3,
      maxCombo: 3,
      gauge: progress,
      callout: config.callout
        ? { kind: config.callout, text: CALLOUT_TEXT[config.callout] }
        : null,
      calloutKey: calloutTick,
      shownMessageCount: 3,
    };
  }, [config, calloutTick]);

  // カットインは自動で消えるため、再表示ボタンで繰り返し確認できるようにする
  const replayCallout = useCallback(() => setCalloutTick((t) => t + 1), []);

  return (
    <div className="debughud">
      <div className="debughud-stage">
        <Hud
          modeLabel="応援モード"
          hud={hud}
          remainingSec={42}
          onCalloutDone={() => {}}
          debugLabel={`DEBUG phase=${config.phase} density=${config.density}`}
        />
      </div>
      {config.callout && (
        <button type="button" className="debughud-replay" onClick={replayCallout}>
          カットイン再表示
        </button>
      )}
    </div>
  );
}
