# v0.2 Release Procedure

1. `release/v0.2-hardening` ブランチで作業
2. `npm run ci` を実行（lint / test / build すべて成功させる）
3. GitHub Pagesで表示確認（マージ前は現行v0.1が表示される点に注意）
4. `docs/manual-test-checklist-v0.2.md` を更新（実機確認結果を記録）
5. mainへPR作成
6. CI成功を確認
7. PRをマージ
8. Deploy workflow成功を確認（Actions → Deploy to GitHub Pages）
9. Pages URL（https://2727-art.github.io/anju-training/）を開いて、トーン選択・頻度選択・称号が表示されることを確認
10. Git tag `v0.2.0` を作成（`git tag v0.2.0 && git push origin v0.2.0`）
11. GitHub Releaseを作成
12. `docs/release-notes-v0.2.md` を本文に反映

## 注意

- 実機確認が未完了の場合は、Release本文に「実機確認は一部未完了」と明記すること。
- `docs/public-release-check-v0.2.md` の未確認項目をOK扱いにしないこと。
- マージ後、`public-release-check-v0.2.md` の「v0.2 UIが表示される」等の未確認項目を実際に確認して更新すること。
