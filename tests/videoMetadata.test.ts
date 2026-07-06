import { describe, expect, it } from 'vitest';
import { validateVideo } from '../src/video/videoMetadata';

describe('validateVideo（縦長判定）', () => {
  it('縦長動画を許可する', () => {
    expect(validateVideo({ durationSec: 60, width: 1080, height: 1920 }).ok).toBe(true);
  });

  it('横長動画を拒否する', () => {
    const r = validateVideo({ durationSec: 60, width: 1920, height: 1080 });
    expect(r.ok).toBe(false);
    expect(r.error).toBe('not-portrait');
  });

  it('正方形動画を拒否する', () => {
    expect(validateVideo({ durationSec: 60, width: 1080, height: 1080 }).ok).toBe(false);
  });

  it('15秒未満は警告付きで許可する', () => {
    const r = validateVideo({ durationSec: 10, width: 720, height: 1280 });
    expect(r.ok).toBe(true);
    expect(r.warning).toBe('short-session');
  });

  it('不正なメタデータを拒否する', () => {
    expect(validateVideo({ durationSec: NaN, width: 0, height: 0 }).ok).toBe(false);
  });
});
