import { useCallback, useRef } from 'react';
import type { TimelineEvent } from '../game/timeline/timelineTypes';

/**
 * currentTime の進行に合わせて、未発火のタイムラインイベントを順に発火する。
 * events は time 昇順である前提。シークバックやリセット時は reset() を呼ぶ。
 */
export function useTimelineRunner(
  events: readonly TimelineEvent[],
  onEvent: (ev: TimelineEvent) => void,
) {
  const cursor = useRef(0);

  const tick = useCallback(
    (currentTime: number) => {
      while (cursor.current < events.length && events[cursor.current].time <= currentTime) {
        onEvent(events[cursor.current]);
        cursor.current += 1;
      }
    },
    [events, onEvent],
  );

  const reset = useCallback(() => {
    cursor.current = 0;
  }, []);

  return { tick, reset };
}
