# 文字コラトレーニング

**文字コラトレーニング**は、ユーザーが端末内に保存している縦長動画を読み込み、その尺に合わせてHUD、ミッション演出、応援メッセージを自動生成するWebアプリです。

中心コンセプトは、**「あなたのペースに合わせて進行する応援型トレーニング」**です。

動画やBGM素材をアプリ側で用意するのではなく、ユーザー自身の動画をステージとして使います。アプリは動画の上にトレーニング用HUDを重ね、セッションの進行に合わせて応援メッセージを表示します。

---

## 公開URL

GitHub Pagesで公開しています。

https://2727-art.github.io/anju-training/

## v0.2 正式版

応援モードのメッセージ体験を強化したバージョンです。

- 応援メッセージ231件
- 応援トーン選択（おまかせ / やさしめ / 元気 / 集中 / しずか）
- メッセージ表示頻度選択（少なめ / ふつう / 多め）
- 設定保存（localStorage・トーンと頻度のみ）
- 称号36件（トーン・頻度・尺・完走のしかたに連動）

実動画での手動確認は `docs/manual-test-checklist-v0.2.md` を参照してください。
リリース内容は `docs/release-notes-v0.2.md` を参照してください。

現在の安定版は **v0.2.0** です。開発ブランチでは **v0.3-alpha（HUD演出強化）** を進めています（`docs/release-notes-v0.3-alpha.md`）。
`?debugHud=1` はHUD確認用の開発機能で、通常利用には影響しません。
サバイバルモードは引き続き Coming soon です（v0.4予定）。
iPhone Safari / Android Chrome の実機確認は継続対象です。

---

## 現在の開発方針

まずは **応援モード** を完成させます。

将来的には **サバイバルモード** を追加予定ですが、初期バージョンでは拡張しやすいファイル構成と型定義のみを用意します。

```text
現在の優先順位
1. 応援モードの完成
2. 応援メッセージ資産の充実
3. サバイバルモードを追加しやすい構造
4. GitHub Pagesで公開しやすい静的Webアプリ化
```

---

## 特徴

- 端末内の動画を読み込む
- 縦長動画限定
- 動画の尺に合わせてミッションを自動生成
- ミッションはオート進行
- ミス判定なし
- 運動回数、姿勢、動作の解析なし
- 応援メッセージを動画上にHUD表示
- 動画やBGM素材をアプリに同梱しない
- サーバー不要
- GitHub Pagesで公開しやすい構成

---

## 重要な考え方

このアプリは、運動の正確性を判定するアプリではありません。

カメラ解析、AI姿勢推定、センサー計測、回数カウントは行いません。  
ミッションは動画の再生時間に合わせて自動的に進みます。

そのため、ユーザー体験としては以下を重視します。

- 続けたくなること
- 応援されている感覚があること
- 最後まで完走した達成感があること
- 自分のペースを肯定されること
- 動画の邪魔をしないHUDであること

---

## プライバシー方針

このアプリは、ユーザーが選んだ動画をアップロードしません。

- 動画はブラウザ内で再生されます
- サーバーに動画を送信しません
- アプリ側で動画を保存しません
- 外部APIに動画を送信しません
- 動画解析は行いません

選択された動画は、セッション中の再生対象としてのみ扱います。

localStorage に保存するのは応援トーンと表示頻度の設定のみです。
動画ファイル名・パス・Blob URL・動画メタデータは保存しません（詳細は `docs/settings-storage.md`）。

---

## 対応動画

初期バージョンでは、縦長動画のみ対応します。

```text
対応: 高さ > 幅 の動画
非対応: 横長動画、正方形に近い動画
```

動画形式は、利用しているブラウザが再生できる形式に依存します。  
一般的にはスマートフォンで撮影された動画を想定しています。

---

## モード

### 応援モード

初期バージョンで完成させるメインモードです。

応援モードでは、動画の尺に合わせて以下の要素が自動進行します。

- ミッション表示
- 応援メッセージ
- コンボ演出
- セッションゲージ
- CLEAR演出
- FINISH演出
- 結果画面

応援モードには失敗判定がありません。  
ユーザーのペースを肯定しながら、動画終了までトレーニングセッションを進行します。

### サバイバルモード

今後追加予定の拡張モードです。

初期バージョンでは、以下のみ用意します。

- `survivalMode.ts`
- `GameModeId`
- `ModeEngine`
- Coming soon 表示
- README上のロードマップ

サバイバルモードは、将来的にDANGERゲージ、耐久演出、ラストスタンド演出などを追加する予定です。  
ただし、サバイバルモードでも実測判定や失敗判定を必須にはしません。

---

## ミッション自動生成

動画内容の解析は行わず、動画の尺をもとにミッションを生成します。

基本フェーズ:

```text
START    0%  - 10%
WARMUP   10% - 30%
KEEP     30% - 60%
PUSH     60% - 85%
FINISH   85% - 100%
```

ミッション数の目安:

```text
15秒未満       簡易セッションまたは警告
15〜30秒       2〜4個
30〜60秒       4〜6個
60〜120秒      6〜10個
120〜180秒     10〜14個
180秒以上      30秒前後ごとの章構成
```

ミッション例:

```text
リズムキープ
ペース維持
いい流れを続ける
呼吸を整える
ラストスパート
完走までキープ
```

避ける表現:

```text
腕立て20回
スクワット30回
正確にできた
今10回成功
カロリー消費を保証
```

---

## 応援メッセージ設計

このアプリでは、動画やBGM素材を同梱しない分、応援メッセージの豊富さを重要な体験資産として扱います。

v0.2時点で231件の日本語メッセージを収録しています（品質は自動テストで担保。レビューは `docs/message-review-v0.2.md` を参照）。

応援トーン（おまかせ / やさしめ / 元気 / 集中 / しずか）と表示頻度（少なめ / ふつう / 多め）を動画選択画面で選べます。

メッセージカテゴリ例:

```text
start
warmup
keep
push
finish
clear
combo
gentle
energetic
focused
calm
recover
short
long
```

メッセージ例:

```text
いい流れ、そのまま続けよう
今のペースで大丈夫
ナイスキープ
焦らず、でも止まらず
ここまで来たよ
ラストまで一緒に行こう
完走まであと少し
今日の流れ、かなりいい
```

避ける表現:

```text
痩せる
絶対成功
もっと追い込めないの？
動きが正確
20回できた
体型評価
医療効果の断定
過度な根性論
```

---

## 技術スタック

想定スタック:

```text
Vite
React
TypeScript
CSS
Vitest
ESLint
GitHub Pages
```

外部API、サーバー、動画アップロード機能は使用しません。

---

## セットアップ

```bash
npm install
npm run dev
```

ローカル開発サーバーが起動したら、ブラウザで表示されたURLを開きます。

---

## 開発コマンド

```bash
npm run dev
```

開発サーバーを起動します。

```bash
npm run test
```

ロジックテストを実行します。

```bash
npm run build
```

本番用ビルドを作成します。

```bash
npm run preview
```

ビルド結果をローカルで確認します。

```bash
npm run lint
```

ESLint を実行します。

```bash
npm run ci
```

lint → test → build をまとめて実行します（CIと同じ順序）。

---

## 想定ファイル構成

```text
src/
  main.tsx
  App.tsx

  app/
    appState.ts
    screenTypes.ts

  components/
    VideoPicker/
      VideoPicker.tsx
      VideoPicker.css
    VideoStage/
      VideoStage.tsx
      VideoStage.css
    Hud/
      Hud.tsx
      Hud.css
      MissionBanner.tsx
      CheerMessage.tsx
      SessionGauge.tsx
      CenterCallout.tsx
    ResultScreen/
      ResultScreen.tsx
      ResultScreen.css
    ModeSelect/
      ModeSelect.tsx
      ModeSelect.css

  game/
    modes/
      types.ts
      supportMode.ts
      survivalMode.ts
    mission/
      missionTypes.ts
      missionGenerator.ts
      missionTemplates.ts
    timeline/
      timelineTypes.ts
      timelineScheduler.ts
    messages/
      messageTypes.ts
      messageBank.ts
      supportMessages.ts
      messageSelector.ts
    result/
      resultTypes.ts
      resultCalculator.ts

  video/
    videoTypes.ts
    videoMetadata.ts
    objectUrl.ts

  hooks/
    useVideoSession.ts
    useTimelineRunner.ts

  styles/
    global.css
    tokens.css

  utils/
    time.ts
    random.ts

tests/
  missionGenerator.test.ts
  messageSelector.test.ts
  videoMetadata.test.ts
  timelineScheduler.test.ts
```

---

## モード拡張設計

モードは `ModeEngine` として分離します。

```ts
export type GameModeId = 'support' | 'survival';

export interface ModeEngine {
  id: GameModeId;
  label: string;
  description: string;
  isEnabled: boolean;
  createSessionPlan(input: CreateSessionPlanInput): SessionPlan;
}
```

初期状態:

```text
support  有効
survival 無効 / Coming soon
```

この構造により、サバイバルモード追加時にHUDやタイムライン生成を差し替えやすくします。

---

## HUD設計

縦長動画を前提に、動画中央をできるだけ邪魔しない配置にします。

```text
上部: モード名、ミッション名、残り時間
左右: コンボ、ゲージ
下部: 応援メッセージ
中央: CLEAR、FEVER、FINISHなど短時間の演出
```

デザイン方針:

- モバイルファースト
- 9:16想定
- safe-area対応
- 大きく読みやすい文字
- 中央の長文表示は避ける
- 点滅しすぎる演出は避ける
- prefers-reduced-motion に配慮する

---

## 結果画面

セッション終了後は、実測成績ではなく完走結果を表示します。

表示例:

```text
完走時間
発生ミッション数
応援メッセージ数
最大コンボ
今日の称号
もう一度プレイ
別の動画を選ぶ
```

称号例:

```text
NICE KEEP
GOOD FLOW
FULL SUPPORT CLEAR
LAST PUSH CLEAR
```

---

## 安全上の注意

このアプリは医療・健康上の助言を行うものではありません。  
運動の効果、消費カロリー、姿勢の正確性を保証しません。

利用中に痛み、めまい、違和感がある場合は中止してください。  
自分の体調に合わせて、無理のない範囲で利用してください。

---

## ロードマップ

### v0.1 MVP

- ローカル動画選択
- 縦長動画判定
- 動画尺取得
- 応援モード
- 自動ミッション生成
- 応援メッセージ表示
- HUD表示
- 結果画面
- GitHub Pages向けビルド

### v0.2 メッセージ強化（完了）

- 応援メッセージ231件
- トーン選択
- 表示頻度選択と設定保存
- メッセージ重複回避の改善
- フェーズ別メッセージ密度調整
- 称号36件へ拡充

### v0.3 HUD演出強化

- CLEAR演出追加
- ゲージ演出追加
- ラストスパート演出追加
- reduced motion対応強化
- 画面サイズ別HUD調整

### v0.4 サバイバルモード

- サバイバルモード有効化
- DANGERゲージ
- 耐久タイムライン
- LAST STAND演出
- SURVIVED結果画面
- サバイバル専用メッセージ

### v0.5 PWA対応

- ホーム画面追加対応
- オフライン起動
- アイコン
- manifest
- Service Worker

---

## コントリビューション方針

歓迎する改善:

- 応援メッセージの追加
- HUDの読みやすさ改善
- モバイル表示の改善
- テスト追加
- アクセシビリティ改善
- サバイバルモード設計案

避けたい変更:

- 動画アップロード機能
- ユーザー動画の外部送信
- 運動効果の断定
- 身体評価を含むメッセージ
- 実測していない成績表示
- 重すぎる依存関係の追加

---

## ライセンス

MIT License です。詳細は `LICENSE` を参照してください。

---

## 開発メモ

このプロジェクトの価値は、動画素材そのものではなく、動画に重ねるHUD体験と応援メッセージにあります。

最初の完成目標は、機能を増やすことではなく、以下を気持ちよく成立させることです。

```text
動画を選ぶ
再生する
応援される
ミッションが進む
最後まで完走する
結果画面で達成感を得る
```
