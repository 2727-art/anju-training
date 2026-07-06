import { useCallback, useEffect, useRef, useState } from 'react';
import type { SelectedVideo } from '../../video/videoTypes';
import type { SessionPlan } from '../../game/modes/types';
import { getMode } from '../../game/modes/modeRegistry';
import { useTimelineRunner } from '../../hooks/useTimelineRunner';
import { useVideoSession } from '../../hooks/useVideoSession';
import type { SessionStats } from '../../game/result/resultCalculator';
import { Hud } from '../Hud/Hud';
import './VideoStage.css';

interface Props {
  video: SelectedVideo;
  plan: SessionPlan;
  onFinish: (stats: SessionStats) => void;
}

export function VideoStage({ video, plan, onFinish }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hud, applyEvent, resetSession, clearCallout } = useVideoSession();
  const { tick, reset } = useTimelineRunner(plan.events, applyEvent);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const finishedRef = useRef(false);
  const hudRef = useRef(hud);
  useEffect(() => {
    hudRef.current = hud;
  }, [hud]);

  // rAFではなく timeupdate で十分（イベント密度が低いため）
  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);
    tick(el.currentTime);
  }, [tick]);

  const handleEnded = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    // 未発火イベントを消化してから結果へ
    tick(plan.durationSec + 1);
    const h = hudRef.current;
    onFinish({ maxCombo: h.maxCombo, shownMessageCount: h.shownMessageCount });
  }, [tick, plan.durationSec, onFinish]);

  const handleReset = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setCurrentTime(0);
    setPlaying(false);
    finishedRef.current = false;
    reset();
    resetSession();
  }, [reset, resetSession]);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }, []);

  useEffect(() => {
    handleReset();
  }, [plan, handleReset]);

  const remainingSec = Math.max(0, plan.durationSec - currentTime);

  return (
    <div className="stage">
      <video
        ref={videoRef}
        className="stage-video"
        src={video.objectUrl}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <Hud
        modeLabel={getMode(plan.modeId).label}
        hud={hud}
        remainingSec={remainingSec}
        onCalloutDone={clearCallout}
      />

      <div className="stage-controls">
        <button type="button" className="stage-btn" onClick={togglePlay}>
          {playing ? '一時停止' : '再生'}
        </button>
        <button type="button" className="stage-btn stage-btn-sub" onClick={handleReset}>
          リセット
        </button>
      </div>
    </div>
  );
}
