import { describe, expect, it } from 'vitest';
import { HUD_LAYERS, hudLayerCssVars } from '../src/components/Hud/hudLayers';

describe('HUDレイヤー定義', () => {
  it('top / side / bottom / center / debug のレイヤーが定義されている', () => {
    for (const name of ['top', 'side', 'bottom', 'center', 'banner', 'debug'] as const) {
      expect(HUD_LAYERS[name]).toBeTypeOf('number');
    }
  });

  it('z-indexが意図した順序（video < top < side < bottom < center < banner < debug）', () => {
    expect(HUD_LAYERS.video).toBeLessThan(HUD_LAYERS.top);
    expect(HUD_LAYERS.top).toBeLessThan(HUD_LAYERS.side);
    expect(HUD_LAYERS.side).toBeLessThan(HUD_LAYERS.bottom);
    expect(HUD_LAYERS.bottom).toBeLessThan(HUD_LAYERS.center);
    expect(HUD_LAYERS.center).toBeLessThan(HUD_LAYERS.banner);
    expect(HUD_LAYERS.banner).toBeLessThan(HUD_LAYERS.debug);
  });

  it('CSS変数として注入できる', () => {
    const vars = hudLayerCssVars();
    expect(vars['--z-hud-center']).toBe(HUD_LAYERS.center);
    expect(vars['--z-hud-debug']).toBe(HUD_LAYERS.debug);
  });
});
