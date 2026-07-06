# v0.1 Public Release Check

確認日: 2026-07-06（v0.2 作業開始前チェック）

| 項目 | 状態 | メモ |
|---|---|---|
| GitHub Pages URL | OK | README に https://2727-art.github.io/anju-training/ を記載済み |
| GitHub Actions Deploy | OK | `.github/workflows/deploy.yml` が main push と workflow_dispatch で起動。Pages Source = GitHub Actions 前提 |
| README公開URL | OK | 公開URL・v0.1 RC 説明・手動チェックリスト参照を記載済み |
| MIT License | OK | `LICENSE`（MIT）あり。README のライセンス欄も MIT |
| npm run ci | OK | lint → test（6ファイル35件）→ build すべて成功（2026-07-06 ローカル確認） |
| サバイバル無効 | OK | `survivalMode.isEnabled: false` / UI は Coming soon 選択不可。テストで担保 |
| iPhone Safari実機 | 未確認 | `docs/manual-test-checklist-v0.1.md` に沿って実機確認が必要 |
| Android Chrome実機 | 未確認 | 同上 |
| PC Chrome | 未確認 | 開発サーバーでの表示・コンソールエラーなしは確認済み。実動画での完走フローは未確認 |

## 補足

- `dist/index.html` のアセットパスが `/anju-training/assets/...` になっていることを確認（本番 base 設定OK）
- ローカル開発時の base は `/` のまま
- GitHub Pages URL の実際の疎通（デプロイ成功・ページ表示）は、Settings → Pages の Source 設定後に Actions の成功とあわせてブラウザで確認すること
- 動画アップロード・外部通信・localStorage への動画情報保存は実装に存在しない
