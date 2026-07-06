import { useEffect } from 'react';

interface Props {
  text: string | null;
  calloutKey: number;
  onDone: () => void;
}

/** CLEAR / FEVER / LAST PUSH など短時間だけ中央に出す演出 */
export function CenterCallout({ text, calloutKey, onDone }: Props) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [text, calloutKey, onDone]);

  if (!text) return null;
  return (
    <div className="hud-callout" key={calloutKey} aria-live="polite">
      {text}
    </div>
  );
}
