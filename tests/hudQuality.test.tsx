import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { Hud } from '../src/components/Hud/Hud';
import { usePrefersReducedMotion } from '../src/hooks/usePrefersReducedMotion';
import type { HudState } from '../src/hooks/useVideoSession';

const hudState: HudState = {
  phase: 'push',
  missionLabel: 'ギアを一段上げる',
  message: 'いける、いける',
  messageKey: 1,
  combo: 3,
  maxCombo: 3,
  gauge: 0.7,
  callout: { kind: 'fever', text: 'FEVER' },
  calloutKey: 1,
  shownMessageCount: 3,
};

describe('HUD品質（v0.3-alpha）', () => {
  const html = renderToStaticMarkup(
    <Hud modeLabel="応援モード" hud={hudState} remainingSec={42} onCalloutDone={() => {}} />,
  );

  it('aria-live は応援メッセージの親コンテナ1箇所だけにある', () => {
    const count = (html.match(/aria-live/g) ?? []).length;
    expect(count).toBe(1);
    expect(html).toMatch(/hud-layer-bottom[^>]*aria-live="polite"/);
  });

  it('中央カットインは読み上げ対象外（aria-hidden）', () => {
    expect(html).toMatch(/hud-callout[^>]*aria-hidden="true"/);
  });

  it('中央演出領域が下部を避ける設定を持つ（CSS inset 下側24%）', () => {
    const css = readFileSync('src/components/Hud/Hud.css', 'utf8');
    expect(css).toMatch(/\.hud-callout\s*\{[^}]*inset:\s*10%\s+0\s+24%\s+0/);
  });

  it('reduced motion hook は window の無い環境で安全に false を返す', () => {
    let value: boolean | null = null;
    function Probe() {
      value = usePrefersReducedMotion();
      return null;
    }
    renderToStaticMarkup(<Probe />);
    expect(value).toBe(false);
  });

  it('debugHud / OrientationBanner は localStorage を参照しない', () => {
    for (const file of [
      'src/app/debugHud.ts',
      'src/components/OrientationBanner/OrientationBanner.tsx',
      'src/components/DebugHud/DebugHudScreen.tsx',
    ]) {
      const src = readFileSync(file, 'utf8');
      // コメントでの言及は許容し、実際のAPI呼び出しがないことを検査する
      expect(/localStorage\s*\.\s*(setItem|getItem|removeItem)/.test(src), file).toBe(false);
    }
  });
});
