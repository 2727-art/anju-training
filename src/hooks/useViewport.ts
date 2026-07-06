import { useEffect, useState } from 'react';
import type { ViewportSize } from '../app/viewport';

/** ウィンドウサイズを追跡する。SSR/テスト環境では縦長のダミー値 */
export function useViewport(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() =>
    typeof window === 'undefined'
      ? { width: 390, height: 844 }
      : { width: window.innerWidth, height: window.innerHeight },
  );

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return size;
}
