import { useRef, useState } from 'react';
import type { GameModeId } from '../../game/modes/types';
import type { SelectedVideo } from '../../video/videoTypes';
import { createVideoUrl, revokeVideoUrl } from '../../video/objectUrl';
import { loadVideoMetadata, validateVideo } from '../../video/videoMetadata';
import { ModeSelect } from '../ModeSelect/ModeSelect';
import './VideoPicker.css';

interface Props {
  onReady: (video: SelectedVideo, modeId: GameModeId) => void;
}

const ERROR_TEXT: Record<string, string> = {
  'not-portrait': '縦長動画のみ対応しています。高さが幅より大きい動画を選んでください。',
  'metadata-failed': '動画を読み込めませんでした。別のファイルを試してください。',
};

export function VideoPicker({ onReady }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modeId, setModeId] = useState<GameModeId>('support');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      onReady({ file, objectUrl, metadata }, modeId);
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
