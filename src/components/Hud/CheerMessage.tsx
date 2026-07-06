interface Props {
  text: string | null;
  messageKey: number;
}

export function CheerMessage({ text, messageKey }: Props) {
  if (!text) return null;
  return (
    <p className="hud-cheer" key={messageKey}>
      {text}
    </p>
  );
}
