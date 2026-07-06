import type { HudState } from '../../hooks/useVideoSession';
import { formatTime } from '../../utils/time';
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
}

const PHASE_LABEL: Record<string, string> = {
  start: 'START',
  warmup: 'WARM UP',
  keep: 'KEEP',
  push: 'PUSH',
  finish: 'FINISH',
};

export function Hud({ modeLabel, hud, remainingSec, onCalloutDone }: Props) {
  return (
    <div className="hud" aria-hidden={false}>
      <div className="hud-top">
        <div className="hud-top-row">
          <span className="hud-mode">{modeLabel}</span>
          <span className="hud-phase">{PHASE_LABEL[hud.phase]}</span>
          <span className="hud-time">残り {formatTime(remainingSec)}</span>
        </div>
        <MissionBanner label={hud.missionLabel} />
      </div>

      <div className="hud-side hud-side-left">
        <div className="hud-combo">
          <span className="hud-combo-num">{hud.combo}</span>
          <span className="hud-combo-tag">COMBO</span>
        </div>
      </div>

      <div className="hud-side hud-side-right">
        <SessionGauge value={hud.gauge} />
      </div>

      <CenterCallout text={hud.callout} calloutKey={hud.calloutKey} onDone={onCalloutDone} />

      <div className="hud-bottom">
        <CheerMessage text={hud.message} messageKey={hud.messageKey} />
      </div>
    </div>
  );
}
