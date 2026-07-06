interface Props {
  label: string | null;
}

export function MissionBanner({ label }: Props) {
  if (!label) return <div className="hud-mission is-empty">STAND BY</div>;
  return (
    <div className="hud-mission" key={label}>
      <span className="hud-mission-tag">MISSION</span>
      <span className="hud-mission-label">{label}</span>
    </div>
  );
}
