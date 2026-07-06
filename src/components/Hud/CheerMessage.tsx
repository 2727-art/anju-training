interface Props {
  text: string | null;
  messageKey: number;
}

/**
 * 下部応援メッセージ。v0.2の主要価値なので読みやすさ優先。
 * aria-live="polite" は親コンテナ側（Hud.tsx）で1箇所だけ付ける。
 */
export function CheerMessage({ text, messageKey }: Props) {
  if (!text) return null;
  return (
    <p className="hud-cheer" key={messageKey}>
      {text}
    </p>
  );
}
