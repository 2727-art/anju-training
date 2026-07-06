export interface VideoMetadata {
  durationSec: number;
  width: number;
  height: number;
}

export interface SelectedVideo {
  file: File;
  objectUrl: string;
  metadata: VideoMetadata;
}

export type VideoValidationError =
  | 'not-portrait'
  | 'too-short'
  | 'metadata-failed';

export interface VideoValidationResult {
  ok: boolean;
  error?: VideoValidationError;
  /** 15秒未満などの注意（エラーではない） */
  warning?: 'short-session';
}
