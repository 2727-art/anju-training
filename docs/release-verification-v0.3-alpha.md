# v0.3-alpha Release Verification

確認日: 2026-07-06

## Summary

v0.3-alpha（HUD演出強化 第一段階）の main 反映と公開状態を記録する。
`gh` CLI 不在のため、PRは使わずローカル `--no-ff` マージでmainへ反映した。

## Release Gate（v0.2.0）

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| GitHub Release v0.2.0 | OK | GitHub API | "v0.2.0 - Message Experience"、published 2026-07-06T11:23:53Z |
| tag v0.2.0 | OK | git ls-remote | origin に存在（0713449 を指す） |
| package.json version | OK | ローカル | 0.2.0 のまま（v0.3-alphaは正式リリースではないため据え置き） |
| CHANGELOG v0.2.0 | OK | ローカル | あり。Unreleased (v0.3-alpha) も分離済み |
| Pages URL | OK | HTTP | 200応答 |
| mainにv0.2.0 | OK | git | 反映済み |
| サバイバル無効 | OK | テスト + ローカルUI | isEnabled: false / Coming soon |
| npm run ci | OK | ローカル | lint / test / build 成功 |

## main反映（v0.3-alpha）

- 方法: ローカル `git merge --no-ff feature/v0.3-hud-polish` → `git push origin main`（gh CLI 不在のためPR未使用）
- 反映前 main: `cb8bd50`
- 反映後 main: `7e4d1d5`（マージコミット。実装本体は `86d0fa6`）
- マージ後に main 上で `npm run ci` 成功を確認してから push

## Deploy / Pages

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| Deploy workflow | OK | GitHub Actions API | 7e4d1d5 の run が conclusion: success |
| Pages URLが開ける | OK | HTTP | 200応答 |
| Pages上のv0.3-alpha反映 | OK | curl（HTML直接取得） | Pages の index.html が v0.3-alpha ビルドのアセット（`index-BOlua_SC.js` / `index-B8haY7m5.css`、ローカルビルドとハッシュ一致）を参照 |
| Pages上でdebugHudが動く | OK（間接確認） | 同一バンドル + ローカル実測 | プレビューブラウザが外部URLへ遷移不可・Chrome拡張未接続のため、Pages上でのブラウザ実行は未実施。同一バンドルのローカル実行では単独/複合クエリとも動作 |
| landscape案内 | OK（ローカル実測） | ブラウザ | 900×500で表示・×で閉じられる |
| サバイバルComing soon | OK | テスト + ローカルUI | 変更なし |
| localStorageにdebug設定非保存 | OK | ブラウザ実測 + テスト | debugHud訪問後もキーなし |

## Public Code View Check

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| Logged-in Code view | 未確認 | Browser | ログインセッションでの目視は未実施 |
| Incognito Code view | OK | 匿名HTTPフェッチ | 2026-07-06 に未ログイン取得でファイル一覧表示を確認（v0.2.0検証時）。空表示は再現せず |
| GitHub API contents | OK | API | ルート一覧が正常応答 |
| Default branch | OK | Browser（匿名） | main |
| Pages source | OK | Workflow成功実績 | GitHub Actions（deploy-pages） |

## 実動画E2E（v0.3-alphaコード）

- 環境: PC Chrome（Chromium系プレビュー）、mainと同一コミットのローカルdev
- 実MP4（480×854・16秒）で: 選択 → HUD表示 → CLEAR / FEVER / LAST PUSH → **FINISH（15.52s、結果遷移前に表示されることを実測）** → 結果画面（FULL FLOW CLEAR）→ もう一度プレイ
- カットインと下部応援メッセージの重なり: なし（カットイン下端577px / メッセージ上端690px、113px余白を実測）
- コンソールエラー: なし
- 注: 再生進行はプレビュー環境のバックグラウンドタブ制限によりシーク駆動

## Known Remaining Items

- iPhone Safari / Android Chrome 実機確認
- Pages URL上でのブラウザ目視（debugHud含む）
- v0.3正式版での見た目微調整と 0.3.0 バージョンアップ
