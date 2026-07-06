import type { GameModeId } from '../../game/modes/types';
import { allModes } from '../../game/modes/modeRegistry';
import './ModeSelect.css';

interface Props {
  selected: GameModeId;
  onSelect: (id: GameModeId) => void;
}

export function ModeSelect({ selected, onSelect }: Props) {
  return (
    <div className="mode-select" role="radiogroup" aria-label="モード選択">
      {allModes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          role="radio"
          aria-checked={selected === mode.id}
          className={`mode-card ${selected === mode.id ? 'is-selected' : ''}`}
          disabled={!mode.isEnabled}
          onClick={() => mode.isEnabled && onSelect(mode.id)}
        >
          <span className="mode-card-label">{mode.label}</span>
          <span className="mode-card-desc">
            {mode.isEnabled ? mode.description : 'Coming soon'}
          </span>
        </button>
      ))}
    </div>
  );
}
