import { useState } from 'react';
import { isLandscape } from '../../app/viewport';
import { useViewport } from '../../hooks/useViewport';
import './OrientationBanner.css';

/**
 * 横向き（landscape）時の軽い案内バナー。
 * セッションは止めず、HUDの上に細く表示するだけ。閉じることもできる。
 */
export function OrientationBanner() {
  const size = useViewport();
  const [dismissed, setDismissed] = useState(false);

  if (!isLandscape(size) || dismissed) return null;
  return (
    <div className="orientation-banner" role="status">
      <span>縦向きでの利用がおすすめです</span>
      <button
        type="button"
        className="orientation-banner-close"
        aria-label="案内を閉じる"
        onClick={() => setDismissed(true)}
      >
        ×
      </button>
    </div>
  );
}
