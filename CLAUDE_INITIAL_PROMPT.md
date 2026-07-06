# Claude Fable 5 初回実装プロンプト

あなたは、シニアフロントエンドエンジニア兼ゲーム設計者として振る舞ってください。
これから GitHub 公開前提の Web アプリ「文字コラトレーニング」を実装します。

## 1. プロジェクト概要

プロジェクト名: 文字コラトレーニング

コンセプト:
ユーザーが端末内に保存している縦長動画を読み込み、その動画の尺に合わせて、アプリ側がトレーニング用のHUD、応援メッセージ、ミッション演出を自動生成するWebアプリです。

ユーザー向けの中心コピー:
「あなたのペースに合わせて進行する応援型トレーニング」

今回の最優先ゴール:
応援モードを完成させること。

将来拡張:
サバイバルモードを追加する予定です。ただし今回の初期実装では、サバイバルモードを完成させなくて構いません。後から無理なく追加できるように、モードエンジン、型定義、ファイル構成、README上のロードマップだけ事前に用意してください。

## 2. 重要な前提

このアプリは、動画やBGM素材を同梱しません。
動画はユーザーが自分の端末から選択します。
アプリは動画をアップロードしません。
サーバー処理は使いません。
外部APIも使いません。
ローカルブラウザ内で完結する設計にしてください。

動画は縦長動画限定です。
横長または正方形に近い動画は、読み込み後にエラー表示してください。

このアプリは運動回数、姿勢、動作、表情、身体状態を判定しません。
カメラ解析、AI解析、センサー解析は行いません。
ミッションは動画の再生時間に合わせて自動進行します。
ミッションの失敗判定はありません。
ユーザーに対しては「オート進行ミッション」「セルフペース」「完走型トレーニング」として自然に見せてください。

## 3. 技術スタック

以下を基本にしてください。

- Vite
- React
- TypeScript
- CSS Modules または通常のCSS
- Vitest
- ESLint
- GitHub Pages にデプロイしやすい静的ビルド

重いUIフレームワークや不要な依存は避けてください。
Tailwind CSSは今回は使わない方針で進めてください。
状態管理ライブラリも最初は不要です。Reactのstate、reducer、カスタムhookで実装してください。

## 4. MVP画面

最低限、以下の3画面を作ってください。

### 4.1 動画選択画面

目的:
ユーザーが端末内の動画を選ぶ。

要件:
- `<input type="file" accept="video/*">` を使う
- 選択後に動画メタデータを読む
- duration, videoWidth, videoHeight を取得する
- height > width の縦長動画のみ許可する
- 動画ファイルはアップロードしないことを画面に明記する
- サバイバルモードは「Coming soon」として表示してよいが、今回は選択不可または無効状態にする

### 4.2 再生 + HUD画面

目的:
動画を再生しながら、ミッション、応援メッセージ、ゲージ、カットインを表示する。

要件:
- 9:16の縦画面を中心にしたモバイルファーストUI
- 動画は中央に表示する
- HUDは動画の上に重ねる
- 上部: モード名、現在ミッション、残り時間
- 左右端: コンボ、セッションゲージなど
- 下部: 応援メッセージ
- 中央: CLEAR、FEVER、LAST PUSH など短時間の演出のみ
- 動画の再生、停止、リセットができる
- currentTime に応じてタイムラインイベントを発火する
- 動画終了時に結果画面へ遷移する

### 4.3 結果画面

目的:
セッション完走後の達成感を出す。

表示するもの:
- 完走時間
- 発生したミッション数
- 表示された応援メッセージ数
- 最大コンボ
- モード名
- 今日の称号
- もう一度プレイ
- 別の動画を選ぶ

注意:
「実際に何回できた」「正確に成功した」といった実測風の表現は禁止です。
結果は「動画セッションを完走した」ことに寄せてください。

## 5. ファイル構成

以下の構成を目安に実装してください。
多少の調整は許可しますが、モード追加、メッセージ追加、ミッションロジック差し替えがしやすい形を守ってください。

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

## 6. モード設計

### 6.1 ModeEngine インターフェース

今後の拡張のために、モードごとの実装を分離してください。

必須イメージ:

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

応援モード:
- isEnabled: true
- 今回完成させる

サバイバルモード:
- isEnabled: false
- createSessionPlan は仮実装または TODO でよい
- 型とファイルは用意する
- UI上は Coming soon

### 6.2 応援モードの性格

応援モードは、失敗しない、責めない、焦らせすぎない、最後まで続けたくなるモードです。
メッセージは、プレイヤーの自己ペースを肯定するものにしてください。

表現例:
- 「いい流れ、そのまま続けよう」
- 「今のペースで大丈夫」
- 「あと少し、ここまで来たよ」
- 「ナイスキープ」
- 「ラストまで一緒に行こう」

避ける表現:
- 「痩せる」
- 「絶対成功」
- 「ノルマ達成」
- 「20回できた」
- 「動きが正確」
- 「もっと追い込めないの？」
- 身体評価、体型評価、医療効果、過度な根性論

## 7. ミッション自動生成

動画内容の解析はしません。
動画尺だけを使ってミッションタイムラインを生成してください。

### 7.1 フェーズ

動画全体を以下のフェーズに分けます。

```text
START    0%  - 10%
WARMUP   10% - 30%
KEEP     30% - 60%
PUSH     60% - 85%
FINISH   85% - 100%
```

### 7.2 ミッション数目安

```text
15秒未満       サポート外または簡易セッション
15〜30秒       2〜4個
30〜60秒       4〜6個
60〜120秒      6〜10個
120〜180秒     10〜14個
180秒以上      30秒前後ごとの章構成
```

実装では、極端に短い動画と長い動画にも壊れず対応すること。
最初は15秒未満に警告を出してもよいです。

### 7.3 ミッション表現

ミッションは実測しないため、運動種目や回数を断定しすぎないでください。

良い例:
- 「リズムキープ」
- 「フォーム意識」
- 「深呼吸して続ける」
- 「ペース維持」
- 「ラストスパート」
- 「完走までキープ」

避ける例:
- 「腕立て20回」
- 「スクワット30回」
- 「腹筋を正確に」
- 「今10回できた」

### 7.4 タイムラインイベント

以下のようなイベント型を用意してください。

```ts
type TimelineEventType =
  | 'mission:start'
  | 'mission:clear'
  | 'message:show'
  | 'combo:up'
  | 'gauge:update'
  | 'callout:show'
  | 'phase:change';
```

イベントは必ず startTime 昇順に並ぶこと。
同じ秒に大量発火しないように調整すること。
メッセージは動画尺に応じて適度な密度にすること。

## 8. 応援メッセージ設計

今回のアプリでは、動画やBGMを同梱しない分、応援メッセージの豊富さを最重要資産にします。

### 8.1 メッセージ数

初期実装では、最低でも100件以上の日本語応援メッセージを用意してください。
可能なら150件程度を目標にしてください。

カテゴリ例:
- start
- warmup
- keep
- push
- finish
- clear
- combo
- gentle
- energetic
- focus
- recover
- short
- long

### 8.2 メッセージ型

```ts
export interface CheerMessageTemplate {
  id: string;
  text: string;
  phase: SessionPhase | 'any';
  tone: 'gentle' | 'energetic' | 'focused' | 'calm';
  intensity: 1 | 2 | 3 | 4 | 5;
  tags: string[];
}
```

### 8.3 メッセージ選択ルール

- 同じ文言を短時間で繰り返さない
- 現在フェーズに合うメッセージを優先する
- 後半ほど intensity が高いメッセージを出す
- 応援モードではユーザーを責めない
- 動画内容や運動内容を決めつけない
- 読みやすい長さを優先する
- 下部表示は1〜2行に収める

## 9. UI/UX

デザイン方針:
- 近未来HUD
- ただし過度に複雑にしない
- 動画の中央を邪魔しない
- 文字はスマホで読みやすく
- safe-area-inset に対応
- prefers-reduced-motion に対応
- タップ領域を十分に大きくする

演出:
- CSSアニメーション中心
- 中央カットインは短く
- HUD表示はフェード、スライド、軽いパルス
- 連続した派手な点滅は禁止
- 音声やBGMは今回追加しない

## 10. プライバシーと安全

READMEと画面上で明記してください。

- 動画は端末内でのみ扱う
- アプリは動画をアップロードしない
- サーバーに動画を保存しない
- 運動の正確性や健康効果を保証しない
- 体調に合わせて無理なく利用する
- 痛みや違和感がある場合は中止する

## 11. 実装順序

以下の順で実装してください。

1. Vite + React + TypeScript のプロジェクト初期化
2. 型定義を作成
3. messageBank と supportMessages を作成
4. missionGenerator を作成
5. timelineScheduler を作成
6. supportMode engine を作成
7. survivalMode stub を作成
8. videoMetadata と objectUrl utilities を作成
9. VideoPicker を作成
10. VideoStage と HUD を作成
11. ResultScreen を作成
12. Vitest でロジックテストを追加
13. README.md を更新
14. npm run test と npm run build が通る状態にする

## 12. テスト要件

最低限、以下のテストを追加してください。

- 縦長動画判定ロジック
- 尺からミッション数が決まること
- タイムラインイベントが昇順で生成されること
- 応援メッセージが同じものばかり連続しないこと
- 応援モードで session plan が生成されること
- サバイバルモードのファイルが存在し、isEnabled: false であること

## 13. READMEに含める内容

README.md には以下を入れてください。

- アプリ概要
- コンセプト
- 現在の対応範囲
- ローカル動画のみを扱うプライバシー方針
- ミス判定なし、オート進行であること
- 応援モードの説明
- サバイバルモードは今後追加予定であること
- セットアップ手順
- 開発コマンド
- ファイル構成
- メッセージ設計
- ロードマップ
- 注意事項
- ライセンス

## 14. 実装時の注意

作業中に不明点があっても、まずは合理的な仮定で進めてください。
初期MVPとして完成させることを優先してください。
必要に応じて TODO コメントを残して構いませんが、アプリが起動し、応援モードが一通り動作する状態にしてください。

コードは読みやすさを優先してください。
過度な抽象化は避けてください。
ただし、サバイバルモード追加に備えたモード分離だけは必ず守ってください。

最後に、以下を報告してください。

- 実装した内容
- 主要ファイル
- 実行コマンド
- テスト結果
- build結果
- 残したTODO
- 次にやるべきこと
