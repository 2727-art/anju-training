import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parseDebugHud } from '../src/app/debugHud';

// localStorage スタブ（debugHudが何も書き込まないことを検査する）
const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  (globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    length: 0,
  };
});
afterEach(() => {
  delete (globalThis as Record<string, unknown>).localStorage;
});

describe('HUDデバッグモード', () => {
  it('debugHud=1 で有効になる', () => {
    expect(parseDebugHud('?debugHud=1').enabled).toBe(true);
    expect(parseDebugHud('').enabled).toBe(false);
    expect(parseDebugHud('?debugHud=0').enabled).toBe(false);
  });

  it('phase指定を読める', () => {
    expect(parseDebugHud('?debugHud=1&phase=push').phase).toBe('push');
    expect(parseDebugHud('?debugHud=1').phase).toBe('keep'); // デフォルト
    expect(parseDebugHud('?debugHud=1&phase=invalid').phase).toBe('keep');
  });

  it('callout指定を読める', () => {
    expect(parseDebugHud('?debugHud=1&callout=fever').callout).toBe('fever');
    expect(parseDebugHud('?debugHud=1&callout=finish').callout).toBe('finish');
    expect(parseDebugHud('?debugHud=1').callout).toBeNull();
  });

  it('density指定を読める', () => {
    expect(parseDebugHud('?debugHud=1&density=high').density).toBe('high');
    expect(parseDebugHud('?debugHud=1').density).toBe('normal');
  });

  it('複合指定（?debugHud=1&phase=push&callout=fever&tone=energetic&density=high）', () => {
    const c = parseDebugHud('?debugHud=1&phase=push&callout=fever&tone=energetic&density=high');
    expect(c).toEqual({
      enabled: true,
      phase: 'push',
      callout: 'fever',
      density: 'high',
      tone: 'energetic',
    });
  });

  it('debug設定をlocalStorageに保存しない', () => {
    parseDebugHud('?debugHud=1&phase=push&callout=fever&density=high');
    expect(store.size).toBe(0);
  });
});
