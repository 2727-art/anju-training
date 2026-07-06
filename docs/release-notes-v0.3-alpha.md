# Release Notes v0.3-alpha

## 概要

v0.3-alphaでは、応援モードのHUD演出と視認性を改善しました。

## 追加

- HUDレイヤー整理（top / side / bottom / center / banner / debug を分離、z-indexを `hudLayers.ts` で一元管理）
- 中央演出の優先度制御（FINISH > LAST PUSH > FEVER > CLEAR、重なり防止、種別ごとの表示時間 800〜1600ms）
- FINISH カットイン（動画終了直前の締め演出）
- 下部応援メッセージの可読性改善（グラデーション背景・clamp()フォント・最大幅・行間）
- safe-area対応強化（結果画面ボタン・下部メッセージ・低画面高さ調整）
- landscape案内表示（「縦向きでの利用がおすすめです」、閉じられる軽量バナー）
- prefers-reduced-motion対応強化（カットインはフェードのみ、ゲージのtransition無効化）
- HUDデバッグモード（`?debugHud=1&phase=push&callout=fever&tone=energetic&density=high`）
- HUD関連テスト（レイヤー・カットイン優先度・ビューポート・デバッグ・アクセシビリティ、計85テスト）

## 変えていないこと

- 動画アップロードなし
- サーバーなし
- 外部APIなし
- BGM・動画素材なし
- 動作解析なし
- 実測成績表示なし
- サバイバルモードはComing soonのまま

## 既知の制限

- iPhone Safari / Android Chrome の実機確認は引き続き必要
- HUD見た目は端末差があるため、v0.3正式版で微調整予定
- debugHud は開発用機能であり、通常利用のUIには現れない
