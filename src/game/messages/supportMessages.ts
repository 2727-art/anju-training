import type { CheerMessageTemplate } from './messageTypes';

/**
 * 応援モード用メッセージ資産。
 * ルール: 責めない / 断定しない / 身体評価しない / 1〜2行で読み切れる長さ。
 */
export const supportMessages: CheerMessageTemplate[] = [
  // ---- start ----
  { id: 's01', text: 'さあ、はじめよう', phase: 'start', tone: 'energetic', intensity: 2, tags: ['start'] },
  { id: 's02', text: '今日も来てくれてうれしい', phase: 'start', tone: 'gentle', intensity: 1, tags: ['start', 'gentle'] },
  { id: 's03', text: '自分のペースでいこう', phase: 'start', tone: 'calm', intensity: 1, tags: ['start', 'pace'] },
  { id: 's04', text: 'スタートを切れた時点でナイス', phase: 'start', tone: 'gentle', intensity: 2, tags: ['start'] },
  { id: 's05', text: '深呼吸して、いこう', phase: 'start', tone: 'calm', intensity: 1, tags: ['start', 'breath'] },
  { id: 's06', text: '始められた、それが一番大事', phase: 'start', tone: 'gentle', intensity: 2, tags: ['start'] },
  { id: 's07', text: '今日のセッション、スタート！', phase: 'start', tone: 'energetic', intensity: 3, tags: ['start'] },
  { id: 's08', text: '肩の力を抜いていこう', phase: 'start', tone: 'calm', intensity: 1, tags: ['start', 'relax'] },
  { id: 's09', text: '準備はそれで十分', phase: 'start', tone: 'gentle', intensity: 1, tags: ['start'] },
  { id: 's10', text: '最初はゆっくりで大丈夫', phase: 'start', tone: 'gentle', intensity: 1, tags: ['start', 'pace'] },

  // ---- warmup ----
  { id: 'w01', text: 'いい入りだね', phase: 'warmup', tone: 'gentle', intensity: 2, tags: ['warmup'] },
  { id: 'w02', text: '体が温まってきた頃', phase: 'warmup', tone: 'calm', intensity: 2, tags: ['warmup'] },
  { id: 'w03', text: 'その調子、その調子', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup'] },
  { id: 'w04', text: 'リズムに乗ってきた', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup', 'rhythm'] },
  { id: 'w05', text: '呼吸を忘れずにね', phase: 'warmup', tone: 'calm', intensity: 1, tags: ['warmup', 'breath'] },
  { id: 'w06', text: '焦らなくていいよ', phase: 'warmup', tone: 'gentle', intensity: 1, tags: ['warmup', 'gentle'] },
  { id: 'w07', text: 'いいウォームアップ', phase: 'warmup', tone: 'gentle', intensity: 2, tags: ['warmup'] },
  { id: 'w08', text: '今のペースで大丈夫', phase: 'warmup', tone: 'gentle', intensity: 2, tags: ['warmup', 'pace'] },
  { id: 'w09', text: '少しずつ、エンジンかかってきた', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup'] },
  { id: 'w10', text: '自分の心地いいテンポを探そう', phase: 'warmup', tone: 'calm', intensity: 1, tags: ['warmup', 'pace'] },
  { id: 'w11', text: '無理せず、でも楽しんで', phase: 'warmup', tone: 'gentle', intensity: 2, tags: ['warmup'] },
  { id: 'w12', text: 'ここからが本番、準備OK', phase: 'warmup', tone: 'focused', intensity: 2, tags: ['warmup'] },

  // ---- keep ----
  { id: 'k01', text: 'いい流れ、そのまま続けよう', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep', 'flow'] },
  { id: 'k02', text: 'ナイスキープ', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep'] },
  { id: 'k03', text: '安定してるね', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep'] },
  { id: 'k04', text: '今日の流れ、かなりいい', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep', 'flow'] },
  { id: 'k05', text: '淡々と続けられるのは強さ', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep'] },
  { id: 'k06', text: '折り返しが見えてきた', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'progress'] },
  { id: 'k07', text: '焦らず、でも止まらず', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep', 'pace'] },
  { id: 'k08', text: 'このリズム、心地いいね', phase: 'keep', tone: 'gentle', intensity: 2, tags: ['keep', 'rhythm'] },
  { id: 'k09', text: '続いてる、それがすごい', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep'] },
  { id: 'k10', text: '呼吸、整ってる？　いい感じ', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'breath'] },
  { id: 'k11', text: '一歩ずつ、確実に進んでる', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep', 'progress'] },
  { id: 'k12', text: 'マイペースが一番強い', phase: 'keep', tone: 'gentle', intensity: 2, tags: ['keep', 'pace'] },
  { id: 'k13', text: 'いいぞ、その集中力', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep', 'focus'] },
  { id: 'k14', text: '半分越えたら、あとは下り坂', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep', 'progress'] },
  { id: 'k15', text: '今日のあなた、続いてる', phase: 'keep', tone: 'gentle', intensity: 2, tags: ['keep'] },
  { id: 'k16', text: 'キープ力、光ってる', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep'] },

  // ---- push ----
  { id: 'p01', text: 'ここからが見せ場', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p02', text: 'あと少し、ここまで来たよ', phase: 'push', tone: 'gentle', intensity: 4, tags: ['push', 'progress'] },
  { id: 'p03', text: 'いける、いける', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p04', text: '山場だけど、ペースはあなたのもの', phase: 'push', tone: 'focused', intensity: 4, tags: ['push', 'pace'] },
  { id: 'p05', text: 'ここを越えたら景色が変わる', phase: 'push', tone: 'focused', intensity: 4, tags: ['push'] },
  { id: 'p06', text: 'ゴールが近づいてきた', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push', 'progress'] },
  { id: 'p07', text: 'きつくなったら呼吸を思い出して', phase: 'push', tone: 'calm', intensity: 3, tags: ['push', 'breath'] },
  { id: 'p08', text: 'その粘り、かっこいい', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p09', text: '残り時間は全部ハイライトだ', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p10', text: '自分の限界は自分で決めていい', phase: 'push', tone: 'gentle', intensity: 3, tags: ['push', 'gentle'] },
  { id: 'p11', text: '集中、ここが一番おいしいところ', phase: 'push', tone: 'focused', intensity: 4, tags: ['push', 'focus'] },
  { id: 'p12', text: 'あなたのペースのまま、駆け抜けよう', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push', 'pace'] },
  { id: 'p13', text: 'ここまでの積み重ねが効いてる', phase: 'push', tone: 'focused', intensity: 4, tags: ['push'] },
  { id: 'p14', text: 'もうひと踏ん張り、一緒に', phase: 'push', tone: 'gentle', intensity: 4, tags: ['push'] },

  // ---- finish ----
  { id: 'f01', text: 'ラストまで一緒に行こう', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f02', text: '完走まであと少し', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish', 'progress'] },
  { id: 'f03', text: 'ゴールテープが見えてる', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f04', text: 'ラストスパート！', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f05', text: '最後の一秒まで、あなたの時間', phase: 'finish', tone: 'focused', intensity: 5, tags: ['finish'] },
  { id: 'f06', text: 'ここまで来た自分を誇っていい', phase: 'finish', tone: 'gentle', intensity: 4, tags: ['finish', 'gentle'] },
  { id: 'f07', text: 'フィニッシュはもう目の前', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f08', text: '駆け抜けろ！', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f09', text: '最高のラスト、見せて', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f10', text: 'あと数呼吸で完走だ', phase: 'finish', tone: 'focused', intensity: 5, tags: ['finish', 'breath'] },

  // ---- any / gentle ----
  { id: 'g01', text: '今日も動けてえらい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g02', text: '休みたくなったら休んでいい', phase: 'any', tone: 'gentle', intensity: 1, tags: ['gentle', 'recover'] },
  { id: 'g03', text: '比べる相手は昨日の自分だけ', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g04', text: '続けてるだけで十分すごい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g05', text: 'あなたのペースが正解', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle', 'pace'] },
  { id: 'g06', text: '無理は禁物、でも今日は調子よさそう', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g07', text: 'ここにいる時点で、もう頑張ってる', phase: 'any', tone: 'gentle', intensity: 1, tags: ['gentle'] },
  { id: 'g08', text: '小さな一歩の積み重ねが大きい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g09', text: '完璧じゃなくていい、続けばいい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g10', text: '今日の自分に、まずは拍手', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },

  // ---- any / energetic ----
  { id: 'e01', text: 'ナイスペース！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic', 'pace'] },
  { id: 'e02', text: 'いいね、その勢い', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e03', text: '今日のあなた、輝いてる', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e04', text: 'ノってきた！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic', 'rhythm'] },
  { id: 'e05', text: 'その調子でGO！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e06', text: 'エネルギー感じる！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e07', text: '画面越しに応援してる！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e08', text: 'ビートに乗っていこう', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic', 'rhythm'] },

  // ---- any / focused ----
  { id: 'fc1', text: '呼吸とリズム、それだけでいい', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus', 'breath'] },
  { id: 'fc2', text: '今この瞬間に集中', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus'] },
  { id: 'fc3', text: '雑念は置いていこう', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus'] },
  { id: 'fc4', text: '体の声を聞きながら進もう', phase: 'any', tone: 'focused', intensity: 2, tags: ['focus', 'recover'] },
  { id: 'fc5', text: '一定のリズムは最強の味方', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus', 'rhythm'] },
  { id: 'fc6', text: 'フォームを意識すると気持ちも整う', phase: 'any', tone: 'focused', intensity: 2, tags: ['focus'] },

  // ---- any / calm ----
  { id: 'c01', text: 'ゆっくり吸って、ゆっくり吐いて', phase: 'any', tone: 'calm', intensity: 1, tags: ['calm', 'breath'] },
  { id: 'c02', text: '静かな集中、いい時間', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c03', text: '心と体、つながってる感じ', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c04', text: '水分もお忘れなく', phase: 'any', tone: 'calm', intensity: 1, tags: ['calm', 'recover'] },
  { id: 'c05', text: '自分だけの時間を楽しもう', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c06', text: '今日の空気、悪くない', phase: 'any', tone: 'calm', intensity: 1, tags: ['calm'] },

  // ---- combo ----
  { id: 'cb1', text: 'コンボ継続中！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo'] },
  { id: 'cb2', text: 'つながってる、いい流れ', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo', 'flow'] },
  { id: 'cb3', text: 'ノーストップ、ナイス', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo'] },
  { id: 'cb4', text: 'この連続、気持ちいい', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo'] },

  // ---- clear ----
  { id: 'cl1', text: 'ミッションクリア、ナイス', phase: 'any', tone: 'energetic', intensity: 3, tags: ['clear'] },
  { id: 'cl2', text: 'ひとつ完了、次いこう', phase: 'any', tone: 'focused', intensity: 3, tags: ['clear'] },
  { id: 'cl3', text: 'クリア！　その積み重ねが力になる', phase: 'any', tone: 'gentle', intensity: 3, tags: ['clear'] },

  // ---- recover ----
  { id: 'r01', text: 'つらい時は深呼吸ひとつ', phase: 'any', tone: 'calm', intensity: 1, tags: ['recover', 'breath'] },
  { id: 'r02', text: 'ペースを落とすのも技術のうち', phase: 'any', tone: 'gentle', intensity: 1, tags: ['recover', 'pace'] },
  { id: 'r03', text: '違和感があったら無理しないでね', phase: 'any', tone: 'gentle', intensity: 1, tags: ['recover'] },
  { id: 'r04', text: '整えてから、また進めばいい', phase: 'any', tone: 'calm', intensity: 1, tags: ['recover'] },

  // ---- keep 追加（長尺向け） ----
  { id: 'k17', text: '長い道のりも一歩ずつ', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'long'] },
  { id: 'k18', text: '時間を味方につけてる', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep', 'long'] },
  { id: 'k19', text: 'ここまでの継続、立派', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep', 'long'] },
  { id: 'k20', text: '景色を楽しむ余裕、あるね', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'long'] },

  // ---- push 追加 ----
  { id: 'p15', text: '疲れてきた？　それは進んでる証拠', phase: 'push', tone: 'gentle', intensity: 4, tags: ['push', 'gentle'] },
  { id: 'p16', text: 'ここからの一分が濃い', phase: 'push', tone: 'focused', intensity: 4, tags: ['push'] },
  { id: 'p17', text: '踏ん張りどころ、応援してる', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p18', text: '波に乗ったまま行こう', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push', 'flow'] },

  // ---- finish 追加 ----
  { id: 'f11', text: '完走が見えた、そのまま！', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f12', text: '最後まで自分のペースで', phase: 'finish', tone: 'gentle', intensity: 4, tags: ['finish', 'pace'] },
  { id: 'f13', text: 'この瞬間のために続けてきた', phase: 'finish', tone: 'focused', intensity: 5, tags: ['finish'] },
  { id: 'f14', text: 'フィナーレ、一緒に締めよう', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },

  // ---- short（短い動画向け） ----
  { id: 'sh1', text: '短くても、やるのがえらい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['short'] },
  { id: 'sh2', text: '一瞬でも動けば体は喜ぶ', phase: 'any', tone: 'energetic', intensity: 2, tags: ['short'] },
  { id: 'sh3', text: 'サクッと完走、いこう', phase: 'any', tone: 'energetic', intensity: 3, tags: ['short'] },

  // ---- long（長い動画向け） ----
  { id: 'lg1', text: 'マラソンは自分との対話', phase: 'any', tone: 'calm', intensity: 2, tags: ['long'] },
  { id: 'lg2', text: '長丁場、給水も忘れずに', phase: 'any', tone: 'calm', intensity: 1, tags: ['long', 'recover'] },
  { id: 'lg3', text: 'じっくり型のあなた、素敵', phase: 'any', tone: 'gentle', intensity: 2, tags: ['long'] },

  // ---- 汎用の後押し ----
  { id: 'a01', text: 'ここまで来たよ', phase: 'any', tone: 'gentle', intensity: 3, tags: ['progress'] },
  { id: 'a02', text: '一緒に進もう', phase: 'any', tone: 'gentle', intensity: 2, tags: ['together'] },
  { id: 'a03', text: '画面の向こうで見守ってる', phase: 'any', tone: 'gentle', intensity: 2, tags: ['together'] },
  { id: 'a04', text: '今日のBGMはあなたのリズム', phase: 'any', tone: 'energetic', intensity: 3, tags: ['rhythm'] },
  { id: 'a05', text: '続きが見たい、その先へ', phase: 'any', tone: 'energetic', intensity: 3, tags: ['progress'] },
  { id: 'a06', text: '汗も勲章のうち', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'a07', text: 'あなたの時間、大切に進行中', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'a08', text: '止まらない限り、前に進んでる', phase: 'any', tone: 'focused', intensity: 3, tags: ['progress'] },
  { id: 'a09', text: '今日も一歩、未来の自分に近づいた', phase: 'any', tone: 'gentle', intensity: 3, tags: ['progress'] },
  { id: 'a10', text: 'このセッション、いい思い出になる', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
];
