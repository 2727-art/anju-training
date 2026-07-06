import type { SessionResult } from '../../game/result/resultTypes';
import { formatTime } from '../../utils/time';
import './ResultScreen.css';

interface Props {
  result: SessionResult;
  onReplay: () => void;
  onPickAnother: () => void;
}

export function ResultScreen({ result, onReplay, onPickAnother }: Props) {
  return (
    <div className="result">
      <p className="result-mode">{result.modeLabel}</p>
      <h1 className="result-headline">セッション完走！</h1>
      <p className="result-title-badge">{result.title}</p>

      <dl className="result-stats">
        <div className="result-stat">
          <dt>完走時間</dt>
          <dd>{formatTime(result.durationSec)}</dd>
        </div>
        <div className="result-stat">
          <dt>ミッション</dt>
          <dd>{result.missionCount}</dd>
        </div>
        <div className="result-stat">
          <dt>応援メッセージ</dt>
          <dd>{result.messageCount}</dd>
        </div>
        <div className="result-stat">
          <dt>最大コンボ</dt>
          <dd>{result.maxCombo}</dd>
        </div>
      </dl>

      <p className="result-note">今日も最後まで走りきりました。おつかれさま！</p>

      <div className="result-actions">
        <button type="button" className="result-btn" onClick={onReplay}>
          もう一度プレイ
        </button>
        <button type="button" className="result-btn result-btn-sub" onClick={onPickAnother}>
          別の動画を選ぶ
        </button>
      </div>
    </div>
  );
}
