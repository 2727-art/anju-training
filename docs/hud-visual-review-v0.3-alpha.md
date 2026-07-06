# HUD Visual Review v0.3-alpha

確認日: 2026-07-06 / 環境: PC Chrome（Chromium系プレビュー、mainと同一コミットのローカルdev）

| 項目 | 状態 | 確認方法 | メモ |
|---|---|---|---|
| 下部応援メッセージの可読性 | OK | debugHud / 実動画E2E | グラデーションパネル上で判読可。25回のサンプリング全てで表示確認 |
| 中央演出と下部メッセージの重なり | OK | debugHud（実測） | callout下端577px / cheer上端690px（113px余白）。CSSで下側24%を回避 |
| CLEAR表示時間 | OK | テスト + debugHud | 800ms（テストで700〜1200ms範囲を担保） |
| FEVER表示時間 | OK | テスト + debugHud | 1000ms |
| LAST PUSH表示時間 | OK | テスト + debugHud | 1100ms |
| FINISH表示時間 | OK | 実動画E2E + テスト | 1600ms。15.52s（97%地点）で発火し結果遷移前に表示されることを実測 |
| safe-area下部 | OK（エミュレーション） | CSS + ブラウザ | env(safe-area-inset-bottom) 反映。実機（ノッチ付き）は未確認 |
| 320px幅 | OK | viewport実測 | 横スクロールなし・is-small-width適用・チップ折り返し正常 |
| 360px幅 | OK | CSS + 375px実測 | 375×812（mobile preset）で正常。360は閾値上 is-small-width 適用対象 |
| 430px幅 | OK | 通常表示 | max-width 480px枠内で正常（デフォルト表示で確認） |
| 横長viewport案内 | OK | 900×500実測 | 「縦向きでの利用がおすすめです」表示・×で閉じる |
| prefers-reduced-motion | OK（ロジック/CSS） | テスト + CSS定義 | is-staticクラス切替・フェードのみ・transition無効をテスト担保。OSレベルでのブラウザ実挙動は未確認 |
| debugHud通常 | OK | ローカル実測 | ?debugHud=1 でデバッグ画面表示 |
| debugHud複合指定 | OK | ローカル実測 | phase=push&callout=fever&tone=energetic&density=high 反映を確認。Pages上は間接確認（同一バンドル） |
| localStorage非保存 | OK | 実測 + テスト | debugHud訪問・E2E完走後もキーなし（設定変更時のみ settings キー） |

## 特記事項

- 「OK（エミュレーション）」「OK（ロジック/CSS）」の項目は、実機・OS設定での最終確認を v0.3 正式版前に行うこと（`manual-test-checklist-v0.3.md`）。
- 未確認をOK扱いしない方針に基づき、実機依存の挙動は上記の通り確認方法を明記した。
