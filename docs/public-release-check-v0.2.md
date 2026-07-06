# v0.2 Public Release Check

確認日: 2026-07-06（release/v0.2-hardening 作業時点）

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| GitHub Code画面にファイルが見える | OK | GitHub API (contents) | README, LICENSE, src, tests, docs, .github/workflows すべて main に存在 |
| mainブランチにsrcがある | OK | GitHub API (contents) | src ディレクトリ確認済み |
| GitHub Pagesが開ける | OK | HTTPフェッチ | https://2727-art.github.io/anju-training/ が200で応答、タイトル「文字コラトレーニング」 |
| v0.2 UIが表示される | OK（間接確認） | Browser / アセットハッシュ | mainマージ・デプロイ済み（12ae75c）。Pages上のバンドルがローカルv0.2ビルドとハッシュ一致。詳細は `release-verification-v0.2.0.md` |
| 応援トーン選択が表示される | OK（間接確認） | Browser / アセットハッシュ | 同上 |
| 表示頻度選択が表示される | OK（間接確認） | Browser / アセットハッシュ | 同上 |
| サバイバルComing soon維持 | OK | Test | `tests/survivalMode.test.ts` で isEnabled: false / Coming soon / 空プランを担保。ローカルUIでも選択不可を確認 |
| Deploy workflow成功 | OK | GitHub Actions API | main への最新 run が conclusion: success（2026-07-06） |
| npm run ci成功 | OK | Local | lint / test / build すべて成功（本ドキュメント作成時点） |
| iPhone Safari実機 | 未確認 | Manual | 実機が必要。`docs/manual-test-checklist-v0.2.md` 参照 |
| Android Chrome実機 | 未確認 | Manual | 同上 |
| PC Chrome | OK | Manual (自動E2E) | 実MP4での完走フローを確認（2026-07-06）。記録は `manual-test-checklist-v0.2.md` |

## 注記

- 「未確認」は実際に確認していない項目。OK扱いにしていない。
- v0.2 UI関連の3項目は、本ブランチを main にマージし Deploy workflow が成功した後、Pages URL 上で再確認して更新すること。
- 実機確認の記録欄は `docs/manual-test-checklist-v0.2.md` にある。
