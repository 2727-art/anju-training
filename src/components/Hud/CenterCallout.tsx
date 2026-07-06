import { useEffect } from 'react';
import {
  CALLOUT_DURATION_MS,
  calloutClassName,
  type Callout,
} from '../../game/hud/calloutQueue';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Props {
  callout: Callout | null;
  calloutKey: number;
  onDone: () => void;
}

/**
 * CLEAR / FEVER / LAST PUSH / FINISH の中央カットイン。
 * 表示時間は種別ごと（calloutQueue.ts）。読み上げ過多を避けるため aria-hidden。
 */
export function CenterCallout({ callout, calloutKey, onDone }: Props) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!callout) return;
    const t = setTimeout(onDone, CALLOUT_DURATION_MS[callout.kind]);
    return () => clearTimeout(t);
  }, [callout, calloutKey, onDone]);

  if (!callout) return null;
  return (
    <div className={calloutClassName(reduced)} key={calloutKey} aria-hidden="true">
      {callout.text}
    </div>
  );
}
