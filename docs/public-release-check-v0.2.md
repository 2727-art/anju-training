# v0.2 Public Release Check

確認日: 2026-07-06（release/v0.2-hardening 作業時点）

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| GitHub Code画面にファイルが見える | OK | GitHub API (contents) | README, LICENSE, src, tests, docs, .github/workflows すべて main に存在 |
| mainブランチにsrcがある | OK | GitHub API (contents) | src ディレクトリ確認済み |
| GitHub Pagesが開ける | OK | HTTPフェッチ | https://2727-art.github.io/anju-training/ が200で応答、タイトル「文字コラトレーニング」 |
| v0.2 UIが表示される | 未確認 | Browser | 現在のPagesは v0.1（v0.2はまだmain未マージ）。mainマージ + デプロイ後に要再確認 |
| 応援トーン選択が表示される | 未確認 | Browser | 同上（ローカルdevサーバーでは表示・動作確認済み） |
| 表示頻度選択が表示される | 未確認 | Browser | 同上（ローカルdevサーバーでは表示・動作確認済み） |
| サバイバルComing soon維持 | OK | Test | `tests/survivalMode.test.ts` で isEnabled: false / Coming soon / 空プランを担保。ローカルUIでも選択不可を確認 |
| Deploy workflow成功 | OK | GitHub Actions API | main への最新 run が conclusion: success（2026-07-06） |
| npm run ci成功 | OK | Local | lint / test / build すべて成功（本ドキュメント作成時点） |
| iPhone Safari実機 | 未確認 | Manual | 実機が必要。`docs/manual-test-checklist-v0.2.md` 参照 |
| Android Chrome実機 | 未確認 | Manual | 同上 |
| PC Chrome | 未確認 | Manual | ローカルdevでの表示・コンソールエラーなしは確認済み。Pages URL上での実動画完走は未確認 |

## 注記

- 「未確認」は実際に確認していない項目。OK扱いにしていない。
- v0.2 UI関連の3項目は、本ブランチを main にマージし Deploy workflow が成功した後、Pages URL 上で再確認して更新すること。
- 実機確認の記録欄は `docs/manual-test-checklist-v0.2.md` にある。
