import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { VideoPicker } from '../src/components/VideoPicker/VideoPicker';
import { ModeSelect } from '../src/components/ModeSelect/ModeSelect';
import { ResultScreen } from '../src/components/ResultScreen/ResultScreen';

// SSRレンダリングで静的マークアップのaria属性を検査する（jsdom不要）

describe('アクセシビリティ（静的マークアップ）', () => {
  const pickerHtml = renderToStaticMarkup(<VideoPicker onReady={() => {}} />);

  it('トーン選択チップが radio ロールと aria-checked を持つ（キーボード操作可能なbutton）', () => {
    expect(pickerHtml).toContain('aria-label="応援トーン"');
    // チップは <button role="radio" aria-checked> — buttonなのでTab/Enter操作可能
    const toneChips = pickerHtml.match(/role="radio"[^>]*aria-checked/g) ?? [];
    expect(toneChips.length).toBeGreaterThanOrEqual(8); // トーン5 + 頻度3 + モード2
  });

  it('頻度選択チップが aria状態を持つ', () => {
    expect(pickerHtml).toContain('aria-label="応援メッセージの頻度"');
    expect(pickerHtml).toContain('aria-checked="true"');
  });

  it('主要ボタン（動画選択）にラベルテキストがある', () => {
    expect(pickerHtml).toContain('縦長動画を選ぶ');
  });

  it('選択状態は色だけでなく aria-checked とクラスで伝わる', () => {
    expect(pickerHtml).toContain('is-active');
    expect(pickerHtml).toContain('aria-checked="true"');
  });

  it('サバイバルモードが disabled として伝わる', () => {
    const modeHtml = renderToStaticMarkup(
      <ModeSelect selected="support" onSelect={() => {}} />,
    );
    expect(modeHtml).toContain('disabled');
    expect(modeHtml).toContain('Coming soon');
    expect(modeHtml).toContain('aria-checked="false"');
  });

  it('結果画面のボタンがbutton要素（キーボード操作可能）', () => {
    const resultHtml = renderToStaticMarkup(
      <ResultScreen
        result={{
          modeId: 'support',
          modeLabel: '応援モード',
          durationSec: 60,
          missionCount: 4,
          messageCount: 6,
          maxCombo: 3,
          title: 'NICE KEEP',
        }}
        onReplay={() => {}}
        onPickAnother={() => {}}
      />,
    );
    expect(resultHtml).toContain('もう一度プレイ');
    expect(resultHtml).toContain('別の動画を選ぶ');
    expect((resultHtml.match(/<button/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });
});
