# GitHub Release v0.2.0 ドラフト

`gh` CLI が未インストールのため、GitHub Release はブラウザから手動作成が必要。
以下の手順と本文をそのまま使用できる。

## 作成手順

1. https://github.com/2727-art/anju-training/releases/new を開く
2. Tag: `v0.2.0`（push済みのタグを選択）
3. Title: `v0.2.0 - Message Experience`
4. 本文に下記をコピーして貼り付け
5. Publish release

`gh` CLI を導入済みの環境なら:

```bash
gh release create v0.2.0 --title "v0.2.0 - Message Experience" --notes-file docs/github-release-v0.2.0-draft.md
```

---

## Release本文（ここから下をコピー）

# v0.2.0 - Message Experience

## 概要

v0.2.0では、応援モードのメッセージ体験を強化しました。

## 主な変更

- 応援メッセージ231件
- 応援トーン選択（おまかせ / やさしめ / 元気 / 集中 / しずか）
- 表示頻度選択（少なめ / ふつう / 多め）
- 設定保存（localStorage・トーンと頻度のみ）
- 称号36件
- メッセージ品質テスト強化
- v0.2向けドキュメント整備

## 変えていないこと

- 動画アップロードなし
- サーバーなし
- 外部APIなし
- BGM・動画素材なし
- 動作解析なし
- 実測成績表示なし
- サバイバルモードはComing soonのまま

## 確認済み

- npm run lint
- npm run test -- --run
- npm run build
- npm run ci
- GitHub Pages表示確認

## 実機確認

実機確認は一部未完了です。
詳細は `docs/manual-test-checklist-v0.2.md` と `docs/release-verification-v0.2.0.md` を参照してください。

## 既知の制限

- 動画再生可否はブラウザの対応形式に依存
- 横長・正方形動画は非対応
- iPhone Safari / Android Chrome は手動確認が必要な場合があります
- サバイバルモードは未有効化です
