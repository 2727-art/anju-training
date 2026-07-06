interface Props {
  /** 0〜1 */
  value: number;
}

export function SessionGauge({ value }: Props) {
  return (
    <div className="hud-gauge" aria-label="セッションゲージ">
      <div className="hud-gauge-fill" style={{ height: `${Math.round(value * 100)}%` }} />
    </div>
  );
}
