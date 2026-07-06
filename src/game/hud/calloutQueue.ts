/**
 * 中央カットイン演出の種別・優先度・表示時間の定義。
 * 同時刻付近に複数の演出が来た場合、優先度の高いものが勝つ。
 */
export type CalloutKind = 'clear' | 'fever' | 'lastpush' | 'finish';

export interface Callout {
  kind: CalloutKind;
  text: string;
}

/** FINISH > LAST_PUSH > FEVER > CLEAR */
export const CALLOUT_PRIORITY: Record<CalloutKind, number> = {
  clear: 1,
  fever: 2,
  lastpush: 3,
  finish: 4,
};

/**
 * 表示時間（ms）。基本は700〜1200ms、FINISHのみ少し長い。
 */
export const CALLOUT_DURATION_MS: Record<CalloutKind, number> = {
  clear: 800,
  fever: 1000,
  lastpush: 1100,
  finish: 1600,
};

/** タイムラインの表示テキストから種別を判定する */
export function kindOfCalloutText(text: string): CalloutKind {
  const t = text.toUpperCase();
  if (t.includes('FINISH')) return 'finish';
  if (t.includes('LAST')) return 'lastpush';
  if (t.includes('FEVER')) return 'fever';
  return 'clear';
}

/**
 * 表示中の演出を新しい演出で置き換えるべきか。
 * 同順位以上なら置き換える（後から来た FINISH が LAST PUSH を上書きする）。
 * 優先度の低い演出は、表示中の高優先度演出を潰さない。
 */
export function shouldReplaceCallout(current: Callout | null, next: Callout): boolean {
  if (!current) return true;
  return CALLOUT_PRIORITY[next.kind] >= CALLOUT_PRIORITY[current.kind];
}

/**
 * 演出用のCSSクラス。reduced motion時はスケール・バウンドを使わない
 * 静的表示クラスに切り替える（フェードのみ）。
 */
export function calloutClassName(reducedMotion: boolean): string {
  return reducedMotion ? 'hud-callout is-static' : 'hud-callout is-animated';
}
