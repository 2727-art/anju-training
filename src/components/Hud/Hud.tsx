import type { CSSProperties } from 'react';
import type { HudState } from '../../hooks/useVideoSession';
import { formatTime } from '../../utils/time';
import { hudLayerCssVars } from './hudLayers';
import { MissionBanner } from './MissionBanner';
import { CheerMessage } from './CheerMessage';
import { SessionGauge } from './SessionGauge';
import { CenterCallout } from './CenterCallout';
import './Hud.css';

interface Props {
  modeLabel: string;
  hud: HudState;
  remainingSec: number;
  onCalloutDone: () => void;
  /** デバッグモード時に小さくDEBUG表示を出す */
  debugLabel?: string | null;
}

const PHASE_LABEL: Record<string, string> = {
  start: 'START',
  warmup: 'WARM UP',
  keep: 'KEEP',
  push: 'PUSH',
  finish: 'FINISH',
};

/**
 * HUDルート。レイヤー構造:
 *   top（情報） / side（ゲージ・コンボ） / bottom（応援） / center（カットイン） / debug
 * 重なり順は hudLayers.ts の定義をCSS変数として注入する。
 */
export function Hud({ modeLabel, hud, remainingSec, onCalloutDone, debugLabel }: Props) {
  return (
    <div className="hud" style={hudLayerCssVars() as CSSProperties}>
      <div className="hud-layer-top">
        <div className="hud-top-row">
          <span className="hud-mode">{modeLabel}</span>
          <span className="hud-phase">{PHASE_LABEL[hud.phase]}</span>
          <span className="hud-time">残り {formatTime(remainingSec)}</span>
        </div>
        <MissionBanner label={hud.missionLabel} />
      </div>

      <div className="hud-layer-side hud-side-left">
        <div className="hud-combo">
          <span className="hud-combo-num">{hud.combo}</span>
          <span className="hud-combo-tag">COMBO</span>
        </div>
      </div>

      <div className="hud-layer-side hud-side-right">
        <SessionGauge value={hud.gauge} />
      </div>

      <CenterCallout callout={hud.callout} calloutKey={hud.calloutKey} onDone={onCalloutDone} />

      <div className="hud-layer-bottom" aria-live="polite">
        <CheerMessage text={hud.message} messageKey={hud.messageKey} />
      </div>

      {debugLabel && <span className="hud-debug-tag">{debugLabel}</span>}
    </div>
  );
}
