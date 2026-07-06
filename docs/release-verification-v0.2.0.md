# v0.2.0 Release Verification

確認日: 2026-07-06

## Summary

v0.2.0の公開状態、GitHub Pages反映、実動画確認、残課題を記録する。
`gh` CLI が未インストールのため、PRは使わずローカルマージでmainへ反映した（経緯は下記）。
GitHub Release の作成は手動が必要（`docs/github-release-v0.2.0-draft.md` 参照）。

## GitHub State

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| mainにv0.2.0反映 | OK | Git | `release/v0.2-hardening` を `--no-ff` マージし push（merge commit `12ae75c`）。PRは gh CLI 不在のため未使用 |
| GitHub Code画面 | OK | GitHub API (contents) | README / LICENSE / src / tests / docs / .github/workflows が main に存在。ブラウザ公開ビューの目視は未実施（API結果と不一致の報告なし） |
| GitHub API / CLI | OK | GitHub REST API | contents / actions/runs とも正常応答。gh CLI は未インストール |
| Deploy workflow | OK | GitHub Actions API | main（12ae75c）の Deploy to GitHub Pages が conclusion: success（2026-07-06T10:41Z） |
| Tag v0.2.0 | OK | Git | ls-remote でタグ不存在を確認後に作成・push（本ドキュメント末尾の記録参照） |
| GitHub Release v0.2.0 | 未実行 | GitHub Releases | gh CLI 不在のため未作成。手順と本文は `docs/github-release-v0.2.0-draft.md` |

## GitHub Pages

| 項目 | 状態 | メモ |
|---|---|---|
| Pages URLが開ける | OK | https://2727-art.github.io/anju-training/ が200応答、タイトル「文字コラトレーニング」 |
| v0.2 UIが見える | OK（間接確認） | Pages上のバンドル `assets/index-D-X-_Xy1.js` がローカルv0.2ビルドとコンテンツハッシュ一致（Viteのハッシュはファイル内容から決定）。同一バンドルのUIはローカルで目視確認済み。Pages上のブラウザ目視は未実施 |
| 応援トーン選択 | OK（間接確認） | 同上（同一バンドル + ローカル目視でチップ5種表示） |
| 表示頻度選択 | OK（間接確認） | 同上（チップ3種表示） |
| サバイバルComing soon | OK | 同一バンドル + ローカルで disabled: true を確認 + テスト担保 |
| Console errorなし | OK（ローカル） | 同一コミットのローカル実行でエラーなし。Pages上での確認は未実施 |

## Manual Video Test

| 環境 | 状態 | 動画尺 | トーン | 頻度 | メモ |
|---|---|---:|---|---|---|
| PC Chrome | OK | 16秒 | 元気 | ふつう | 自動E2E（mainと同一コミットのローカルdev、Chromium系プレビュー）。実MP4(480x854)で選択→HUD→完走→結果（FULL FLOW CLEAR）→もう一度→別の動画まで確認。再生進行はプレビュー環境のバックグラウンドタブ制限によりシーク駆動 |
| iPhone Safari | 未確認 | | | | 実機なし |
| Android Chrome | 未確認 | | | | 実機なし |

## localStorage Check

保存されてよいもの:
- キー `anju-training:settings:v1`
- `tonePreference`
- `messageFrequency`

保存してはいけないもの:
- 動画ファイル名 / 動画パス / Blob URL / videoWidth / videoHeight / duration / 動画メタデータ

| 項目 | 状態 | メモ |
|---|---|---|
| 設定保存 | OK | `{"tonePreference":"energetic","messageFrequency":"normal"}` を確認 |
| リロード後復元 | OK | リロード後もチップ選択が復元されることを確認 |
| 動画情報非保存 | OK | E2E完走後の localStorage 全キー走査で設定キーのみ。blob: / .mp4 / 解像度値の混入なし（テスト `tests/settings.test.ts` でも担保） |

## その他の確認

- アプリの外部通信: なし（ネットワークログ上、アプリ由来のリクエストは localhost と blob: のみ。CDNへの1件はテストツール読み込みでありアプリ動作とは無関係）
- npm run ci: 成功（lint / 57テスト / build）
- サバイバルモード: isEnabled: false / Coming soon / 選択不可を維持

## Public Code View Check（2026-07-06 追記）

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| Logged-in Code view | 未確認 | Browser | ログインセッションでの目視は未実施 |
| Incognito Code view | OK | 匿名HTTPフェッチ | 未ログイン状態でリポジトリページを取得し、README / src / tests / docs / LICENSE / .github/workflows のファイル一覧と説明文が表示されることを確認。「空に見える」事象は再現せず |
| GitHub API contents | OK | API | ルート一覧が正常応答 |
| Default branch | OK | Browser（匿名） | main |
| Pages source | OK | Workflow成功実績 | GitHub Actions（deploy-pages）経由で配信 |

## GitHub Release v0.2.0（2026-07-06 追記）

ユーザーが手動で作成し、公開を確認した。

- tag_name: v0.2.0 / name: "v0.2.0 - Message Experience"
- draft: false / prerelease: false
- published_at: 2026-07-06T11:23:53Z
- 本文: `docs/github-release-v0.2.0-draft.md` の内容を反映

これにより v0.3 Release Gate の全条件を満たした。

## Known Remaining Items

- iPhone Safari実機確認: 未実施
- Android Chrome実機確認: 未実施
- GitHub Release v0.2.0 の手動作成（ドラフトあり）
- Pages URL上でのブラウザ目視確認（バンドル一致による間接確認のみのため、開いて一度確認することを推奨）
