import { describe, expect, it } from 'vitest';
import {
  isLandscape,
  isLowHeight,
  isSmallWidth,
  viewportClasses,
} from '../src/app/viewport';

describe('ビューポート判定', () => {
  it('portrait判定（縦長ではlandscapeにならない）', () => {
    expect(isLandscape({ width: 390, height: 844 })).toBe(false);
  });

  it('landscape判定', () => {
    expect(isLandscape({ width: 844, height: 390 })).toBe(true);
    expect(isLandscape({ width: 1280, height: 800 })).toBe(true);
  });

  it('small width判定（360px以下）', () => {
    expect(isSmallWidth({ width: 320, height: 700 })).toBe(true);
    expect(isSmallWidth({ width: 390, height: 844 })).toBe(false);
  });

  it('low height判定（600px以下）', () => {
    expect(isLowHeight({ width: 390, height: 560 })).toBe(true);
    expect(isLowHeight({ width: 390, height: 844 })).toBe(false);
  });

  it('状態クラスが条件に応じて付与される', () => {
    expect(viewportClasses({ width: 390, height: 844 })).toEqual([]);
    expect(viewportClasses({ width: 844, height: 390 })).toContain('is-landscape');
    expect(viewportClasses({ width: 320, height: 560 })).toEqual(
      expect.arrayContaining(['is-small-width', 'is-low-height']),
    );
  });
});
