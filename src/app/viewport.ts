/**
 * ビューポート判定の純関数群。hookやコンポーネントから使う。
 */
export interface ViewportSize {
  width: number;
  height: number;
}

/** 横向き（縦動画体験が崩れやすい状態） */
export function isLandscape(size: ViewportSize): boolean {
  return size.width > size.height;
}

/** 小画面幅（チップUI・フォントをコンパクトにする閾値） */
export function isSmallWidth(size: ViewportSize): boolean {
  return size.width <= 360;
}

/** 低い画面高さ（HUD密度を抑える閾値） */
export function isLowHeight(size: ViewportSize): boolean {
  return size.height <= 600;
}

/** ルート要素に付けるビューポート状態クラス */
export function viewportClasses(size: ViewportSize): string[] {
  const classes: string[] = [];
  if (isLandscape(size)) classes.push('is-landscape');
  if (isSmallWidth(size)) classes.push('is-small-width');
  if (isLowHeight(size)) classes.push('is-low-height');
  return classes;
}
