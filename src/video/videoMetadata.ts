import type { VideoMetadata, VideoValidationResult } from './videoTypes';

/**
 * 縦長判定。height > width のみ許可する。
 * 15秒未満はエラーではなく警告として返す。
 */
export function validateVideo(meta: VideoMetadata): VideoValidationResult {
  if (meta.width <= 0 || meta.height <= 0 || !Number.isFinite(meta.durationSec)) {
    return { ok: false, error: 'metadata-failed' };
  }
  if (meta.height <= meta.width) {
    return { ok: false, error: 'not-portrait' };
  }
  if (meta.durationSec < 15) {
    return { ok: true, warning: 'short-session' };
  }
  return { ok: true };
}

/** objectUrl から動画メタデータを読む（ブラウザ専用） */
export function loadVideoMetadata(objectUrl: string): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve({
        durationSec: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
      video.src = '';
    };
    video.onerror = () => reject(new Error('metadata-failed'));
    video.src = objectUrl;
  });
}
