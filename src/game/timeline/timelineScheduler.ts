import type { Mission } from '../mission/missionTypes';
import type { PhaseWindow } from '../modes/types';
import type { TimelineEvent } from './timelineTypes';
import { selectMessage } from '../messages/messageSelector';
import { phaseAt } from '../mission/missionGenerator';

export interface BuildTimelineInput {
  durationSec: number;
  phases: PhaseWindow[];
  missions: Mission[];
  rand: () => number;
}

/** 同時刻の大量発火を避けるための最小イベント間隔（秒） */
const MIN_GAP = 0.4;

/**
 * ミッション・メッセージ・演出をひとつのタイムラインに合成する。
 * 返すイベントは必ず time 昇順。
 */
export function buildTimeline(input: BuildTimelineInput): TimelineEvent[] {
  const { durationSec, phases, missions, rand } = input;
  const events: TimelineEvent[] = [];
  let seq = 0;
  const nextId = () => `ev-${++seq}`;

  // フェーズ切り替え
  for (const w of phases) {
    events.push({ id: nextId(), type: 'phase:change', time: w.startTime, phase: w.phase });
  }

  // ミッション開始 / クリア / コンボ / ゲージ
  for (const m of missions) {
    events.push({
      id: nextId(),
      type: 'mission:start',
      time: m.startTime,
      missionId: m.id,
      label: m.label,
    });
    events.push({ id: nextId(), type: 'mission:clear', time: m.endTime, missionId: m.id });
    events.push({ id: nextId(), type: 'combo:up', time: m.endTime + MIN_GAP });
    events.push({
      id: nextId(),
      type: 'gauge:update',
      time: m.endTime + MIN_GAP,
      value: Math.min(1, m.endTime / durationSec),
    });
  }

  // 応援メッセージ: 尺に応じた密度（約10秒に1回、最低3件）
  const messageCount = Math.max(3, Math.round(durationSec / 10));
  const recentIds: string[] = [];
  for (let i = 0; i < messageCount; i++) {
    const time = (durationSec * (i + 0.5)) / messageCount;
    const progress = time / durationSec;
    const msg = selectMessage({
      phase: phaseAt(phases, time),
      progress,
      recentIds,
      rand,
    });
    recentIds.push(msg.id);
    if (recentIds.length > 8) recentIds.shift();
    events.push({
      id: nextId(),
      type: 'message:show',
      time,
      messageId: msg.id,
      text: msg.text,
    });
  }

  // 中央カットイン演出
  const pushStart = phases.find((w) => w.phase === 'push');
  const finishStart = phases.find((w) => w.phase === 'finish');
  if (pushStart) {
    events.push({ id: nextId(), type: 'callout:show', time: pushStart.startTime, text: 'FEVER' });
  }
  if (finishStart) {
    events.push({ id: nextId(), type: 'callout:show', time: finishStart.startTime, text: 'LAST PUSH' });
  }

  events.sort((a, b) => a.time - b.time);

  // 同一秒への密集をずらす（順序は保ったまま最小間隔を確保）
  for (let i = 1; i < events.length; i++) {
    if (events[i].time - events[i - 1].time < 0.05) {
      events[i] = { ...events[i], time: events[i - 1].time + 0.05 };
    }
  }

  return events;
}
