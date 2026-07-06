/**
 * File の objectURL 管理。
 * 動画はアップロードせず、ブラウザ内の URL.createObjectURL のみで扱う。
 */
export function createVideoUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeVideoUrl(url: string | null | undefined): void {
  if (url) URL.revokeObjectURL(url);
}
