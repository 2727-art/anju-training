# 設定保存仕様（localStorage）

実装: `src/app/settings.ts` / テスト: `tests/settings.test.ts`

## 保存するもの

ユーザーが動画選択画面で選んだ2つの設定のみ。

| プロパティ | 型（内部値） | UI表示名 |
|---|---|---|
| `tonePreference` | `'auto' \| 'gentle' \| 'energetic' \| 'focused' \| 'calm'` | おまかせ / やさしめ / 元気 / 集中 / しずか |
| `messageFrequency` | `'low' \| 'normal' \| 'high'` | 少なめ / ふつう / 多め |

## 保存しないもの

- 動画ファイル名
- 動画ファイルのパス
- Blob URL（`URL.createObjectURL` の結果）
- 動画メタデータ（幅・高さ・尺）
- セッション結果・称号・コンボなどのプレイ履歴

## 保存キー名

```text
anju-training:settings:v1
```

## 保存値の例

```json
{"tonePreference":"gentle","messageFrequency":"high"}
```

## プライバシー上の理由

このアプリは「動画を端末内でのみ扱い、何も外部に送信しない」ことを最重要方針としている。
localStorage は同一オリジンの他スクリプトや端末共有者から読める可能性があるため、
動画に関する情報（ファイル名・パス・メタデータ）は一切保存しない。
保存するのは応援の好みを表す2つの列挙値のみで、個人を特定できる情報を含まない。

## 設定リセット方法

- ブラウザの開発者ツール → Application → Local Storage → `anju-training:settings:v1` を削除
- またはブラウザのサイトデータ削除
- 保存データが壊れている場合、アプリは自動的にデフォルト設定（おまかせ / ふつう）に戻る

## バージョニング

キー末尾の `:v1` は保存形式のバージョン。形式を変える場合は `:v2` として新キーを使い、
旧キーの読み込み互換またはデフォルトへのフォールバックを行うこと。
