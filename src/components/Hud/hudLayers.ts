/**
 * HUDレイヤーの重なり順（z-index）定義。
 * CSSでは Hud ルートの CSS変数（--z-hud-*）として注入して使う。
 * 数値が大きいほど手前。順序を変える場合はここだけを直す。
 */
export const HUD_LAYERS = {
  /** 動画本体（HUDの背面） */
  video: 0,
  /** 上部情報（モード名・ミッション・残り時間） */
  top: 10,
  /** 左右（コンボ・セッションゲージ） */
  side: 20,
  /** 下部応援メッセージ */
  bottom: 30,
  /** 中央カットイン */
  center: 40,
  /** 横向き案内などのバナー */
  banner: 50,
  /** デバッグ表示（常に最前面） */
  debug: 60,
} as const;

export type HudLayerName = keyof typeof HUD_LAYERS;

/** Hudルート要素に注入するCSS変数を生成する */
export function hudLayerCssVars(): Record<string, number> {
  return Object.fromEntries(
    Object.entries(HUD_LAYERS).map(([name, z]) => [`--z-hud-${name}`, z]),
  );
}
