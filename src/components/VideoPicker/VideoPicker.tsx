import { useRef, useState } from 'react';
import type {
  GameModeId,
  MessageFrequency,
  SessionOptions,
  TonePreference,
} from '../../game/modes/types';
import type { SelectedVideo } from '../../video/videoTypes';
import { createVideoUrl, revokeVideoUrl } from '../../video/objectUrl';
import { loadVideoMetadata, validateVideo } from '../../video/videoMetadata';
import { loadSettings, saveSettings } from '../../app/settings';
import { ModeSelect } from '../ModeSelect/ModeSelect';
import './VideoPicker.css';

interface Props {
  onReady: (video: SelectedVideo, modeId: GameModeId, options: SessionOptions) => void;
}

const TONE_CHOICES: ReadonlyArray<{ value: TonePreference; label: string }> = [
  { value: 'auto', label: 'おまかせ' },
  { value: 'gentle', label: 'やさしめ' },
  { value: 'energetic', label: '元気' },
  { value: 'focused', label: '集中' },
  { value: 'calm', label: 'しずか' },
];

const FREQUENCY_CHOICES: ReadonlyArray<{ value: MessageFrequency; label: string }> = [
  { value: 'low', label: '少なめ' },
  { value: 'normal', label: 'ふつう' },
  { value: 'high', label: '多め' },
];

const ERROR_TEXT: Record<string, string> = {
  'not-portrait': '縦長動画のみ対応しています。高さが幅より大きい動画を選んでください。',
  'metadata-failed': '動画を読み込めませんでした。別のファイルを試してください。',
};

export function VideoPicker({ onReady }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modeId, setModeId] = useState<GameModeId>('support');
  const [options, setOptions] = useState<SessionOptions>(loadSettings);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateOptions(patch: Partial<SessionOptions>) {
    setOptions((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }

  async function handleFile(file: File) {
    setError(null);
    setWarning(null);
    setLoading(true);
    const objectUrl = createVideoUrl(file);
    try {
      const metadata = await loadVideoMetadata(objectUrl);
      const check = validateVideo(metadata);
      if (!check.ok) {
        revokeVideoUrl(objectUrl);
        setError(ERROR_TEXT[check.error ?? 'metadata-failed']);
        return;
      }
      if (check.warning === 'short-session') {
        setWarning('15秒未満の動画のため、簡易セッションになります。');
      }
      onReady({ file, objectUrl, metadata }, modeId, options);
    } catch {
      revokeVideoUrl(objectUrl);
      setError(ERROR_TEXT['metadata-failed']);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="picker">
      <header className="picker-header">
        <h1 className="picker-title">文字コラトレーニング</h1>
        <p className="picker-copy">あなたのペースに合わせて進行する応援型トレーニング</p>
      </header>

      <ModeSelect selected={modeId} onSelect={setModeId} />

      <section className="picker-options">
        <div className="picker-option-group" role="radiogroup" aria-label="応援トーン">
          <span className="picker-option-label">応援トーン</span>
          <div className="picker-chips">
            {TONE_CHOICES.map((c) => (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={options.tonePreference === c.value}
                className={`picker-chip ${options.tonePreference === c.value ? 'is-active' : ''}`}
                onClick={() => updateOptions({ tonePreference: c.value })}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="picker-option-group" role="radiogroup" aria-label="応援メッセージの頻度">
          <span className="picker-option-label">メッセージ頻度</span>
          <div className="picker-chips">
            {FREQUENCY_CHOICES.map((c) => (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={options.messageFrequency === c.value}
                className={`picker-chip ${options.messageFrequency === c.value ? 'is-active' : ''}`}
                onClick={() => updateOptions({ messageFrequency: c.value })}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        className="picker-button"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? '読み込み中…' : '縦長動画を選ぶ'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = '';
        }}
      />

      {error && <p className="picker-error" role="alert">{error}</p>}
      {warning && <p className="picker-warning">{warning}</p>}

      <section className="picker-privacy">
        <h2>プライバシー</h2>
        <ul>
          <li>動画はアップロードされません（端末内でのみ再生されます）</li>
          <li>サーバー処理・外部API送信は行いません</li>
          <li>運動の回数・姿勢・正確性は判定しません（オート進行ミッション）</li>
          <li>痛みや違和感がある場合は利用を中止してください</li>
        </ul>
      </section>
    </div>
  );
}
