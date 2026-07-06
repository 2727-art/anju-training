import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadSettings, saveSettings } from '../src/app/settings';
import { defaultSessionOptions } from '../src/game/modes/types';

/** docs/settings-storage.md と一致させるべき保存キー */
const STORAGE_KEY = 'anju-training:settings:v1';

// node 環境用の localStorage スタブ
function createStorageStub() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
    _dump: () => Object.fromEntries(store),
  };
}

let storage: ReturnType<typeof createStorageStub>;

beforeEach(() => {
  storage = createStorageStub();
  (globalThis as Record<string, unknown>).localStorage = storage;
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).localStorage;
});

describe('設定の保存・復元', () => {
  it('tonePreference と messageFrequency が保存・復元される', () => {
    saveSettings({ tonePreference: 'gentle', messageFrequency: 'high' });
    const loaded = loadSettings();
    expect(loaded.tonePreference).toBe('gentle');
    expect(loaded.messageFrequency).toBe('high');
  });

  it('docs記載のキー名・値の形で保存される', () => {
    saveSettings({ tonePreference: 'gentle', messageFrequency: 'high' });
    const raw = storage.getItem(STORAGE_KEY);
    expect(raw).toBe('{"tonePreference":"gentle","messageFrequency":"high"}');
  });

  it('未保存時・壊れたデータ時はデフォルト設定を返す', () => {
    expect(loadSettings()).toEqual(defaultSessionOptions);
    storage.setItem(STORAGE_KEY, 'not-json{{{');
    expect(loadSettings()).toEqual(defaultSessionOptions);
    storage.setItem(STORAGE_KEY, '{"tonePreference":"hacked","messageFrequency":42}');
    expect(loadSettings()).toEqual(defaultSessionOptions);
  });

  it('動画ファイル名・Blob URL・動画メタデータを保存しない', () => {
    saveSettings({ tonePreference: 'calm', messageFrequency: 'low' });
    const dump = JSON.stringify(storage._dump());
    expect(dump.includes('blob:')).toBe(false);
    expect(dump.includes('.mp4')).toBe(false);
    expect(dump.includes('videoWidth')).toBe(false);
    expect(dump.includes('videoHeight')).toBe(false);
    expect(dump.includes('duration')).toBe(false);
    expect(dump.includes('file')).toBe(false);
    // 保存されるプロパティは設定の2つのみ
    const saved = JSON.parse(storage.getItem(STORAGE_KEY) as string);
    expect(Object.keys(saved).sort()).toEqual(['messageFrequency', 'tonePreference']);
  });
});
