import type { CheerMessageTemplate } from './messageTypes';

/**
 * v0.2 で追加した応援メッセージ資産（約100件）。
 * ルールは supportMessages.ts と同じ: 責めない / 断定しない / 身体評価しない。
 */
export const supportMessagesV2: CheerMessageTemplate[] = [
  // ---- start ----
  { id: 's11', text: '今日のステージはあなたの動画', phase: 'start', tone: 'energetic', intensity: 2, tags: ['start'] },
  { id: 's12', text: '気負わず、軽やかに', phase: 'start', tone: 'calm', intensity: 1, tags: ['start', 'relax'] },
  { id: 's13', text: '最初の一歩がいちばん重い、もう越えたね', phase: 'start', tone: 'gentle', intensity: 2, tags: ['start'] },
  { id: 's14', text: 'いってらっしゃい、いいセッションを', phase: 'start', tone: 'gentle', intensity: 1, tags: ['start'] },
  { id: 's15', text: '音より先に、呼吸に乗ろう', phase: 'start', tone: 'focused', intensity: 2, tags: ['start', 'breath'] },
  { id: 's16', text: '今日は今日のコンディションでOK', phase: 'start', tone: 'gentle', intensity: 1, tags: ['start', 'pace'] },

  // ---- warmup ----
  { id: 'w13', text: 'じわじわ来てる、いい兆し', phase: 'warmup', tone: 'calm', intensity: 2, tags: ['warmup'] },
  { id: 'w14', text: '体が目を覚ましてきた', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup'] },
  { id: 'w15', text: 'リズムの入口、見つかったね', phase: 'warmup', tone: 'focused', intensity: 2, tags: ['warmup', 'rhythm'] },
  { id: 'w16', text: 'その滑り出し、上々', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup'] },
  { id: 'w17', text: 'まだ序盤、余力は残しておこう', phase: 'warmup', tone: 'calm', intensity: 1, tags: ['warmup', 'pace'] },
  { id: 'w18', text: '温まるまでは丁寧に', phase: 'warmup', tone: 'focused', intensity: 2, tags: ['warmup'] },
  { id: 'w19', text: 'いいテンポの予感', phase: 'warmup', tone: 'gentle', intensity: 2, tags: ['warmup', 'rhythm'] },
  { id: 'w20', text: '波に乗る準備、整ってきた', phase: 'warmup', tone: 'energetic', intensity: 2, tags: ['warmup'] },

  // ---- keep ----
  { id: 'k21', text: '続けるって、それだけで才能', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep'] },
  { id: 'k22', text: '静かに燃えてる感じ、いいね', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep'] },
  { id: 'k23', text: 'この区間を楽しめたら勝ち', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep'] },
  { id: 'k24', text: 'いつの間にか進んでる、それが理想', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'progress'] },
  { id: 'k25', text: 'コツコツは裏切らない', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep'] },
  { id: 'k26', text: 'リズムが体に馴染んできた', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep', 'rhythm'] },
  { id: 'k27', text: '迷ったらペースを守ればいい', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'pace'] },
  { id: 'k28', text: '中盤戦、落ち着いていこう', phase: 'keep', tone: 'focused', intensity: 3, tags: ['keep'] },
  { id: 'k29', text: 'この安定感、頼もしい', phase: 'keep', tone: 'gentle', intensity: 3, tags: ['keep'] },
  { id: 'k30', text: '呼吸と一緒に前へ', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'breath'] },
  { id: 'k31', text: '積み上げの時間、悪くない', phase: 'keep', tone: 'calm', intensity: 2, tags: ['keep', 'long'] },
  { id: 'k32', text: 'キープの美学、体現中', phase: 'keep', tone: 'energetic', intensity: 3, tags: ['keep'] },

  // ---- push ----
  { id: 'p19', text: '波が来てる、乗っていこう', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push', 'flow'] },
  { id: 'p20', text: '追い風に変わった', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p21', text: 'ここからは気持ちが推進力', phase: 'push', tone: 'focused', intensity: 4, tags: ['push'] },
  { id: 'p22', text: '残り区間、あなたのショータイム', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p23', text: '苦しい時こそフォーム意識', phase: 'push', tone: 'focused', intensity: 4, tags: ['push', 'focus'] },
  { id: 'p24', text: '一番濃い時間に入った', phase: 'push', tone: 'focused', intensity: 4, tags: ['push'] },
  { id: 'p25', text: '出し切らなくていい、続けばいい', phase: 'push', tone: 'gentle', intensity: 3, tags: ['push', 'gentle'] },
  { id: 'p26', text: '熱くなってきた、いい傾向', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },
  { id: 'p27', text: 'ゴールの気配がしてきた', phase: 'push', tone: 'calm', intensity: 4, tags: ['push', 'progress'] },
  { id: 'p28', text: 'この盛り上がり、主役はあなた', phase: 'push', tone: 'energetic', intensity: 4, tags: ['push'] },

  // ---- finish ----
  { id: 'f15', text: '有終の美、いこう', phase: 'finish', tone: 'focused', intensity: 5, tags: ['finish'] },
  { id: 'f16', text: '締めくくりの時間だ', phase: 'finish', tone: 'calm', intensity: 4, tags: ['finish'] },
  { id: 'f17', text: '完走の景色まであと数歩', phase: 'finish', tone: 'gentle', intensity: 5, tags: ['finish', 'progress'] },
  { id: 'f18', text: 'ここまでの全部が花道になる', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f19', text: 'ラスト、笑って締めよう', phase: 'finish', tone: 'gentle', intensity: 4, tags: ['finish'] },
  { id: 'f20', text: 'フィニッシュライン、目前', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },
  { id: 'f21', text: '最後の呼吸まで丁寧に', phase: 'finish', tone: 'focused', intensity: 4, tags: ['finish', 'breath'] },
  { id: 'f22', text: '今日の物語、クライマックス', phase: 'finish', tone: 'energetic', intensity: 5, tags: ['finish'] },

  // ---- any / gentle ----
  { id: 'g11', text: 'うまくいかない日も、来た日はいい日', phase: 'any', tone: 'gentle', intensity: 1, tags: ['gentle'] },
  { id: 'g12', text: '今日の分、ちゃんと積めてる', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle', 'progress'] },
  { id: 'g13', text: 'がんばりすぎない勇気も応援してる', phase: 'any', tone: 'gentle', intensity: 1, tags: ['gentle', 'recover'] },
  { id: 'g14', text: 'それで十分、ほんとに', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g15', text: 'あなたの続け方、好きだよ', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g16', text: '休むのも前進のうち', phase: 'any', tone: 'gentle', intensity: 1, tags: ['gentle', 'recover'] },
  { id: 'g17', text: '気楽に、でも誇らしく', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle'] },
  { id: 'g18', text: 'マイペース万歳', phase: 'any', tone: 'gentle', intensity: 2, tags: ['gentle', 'pace'] },

  // ---- any / energetic ----
  { id: 'e09', text: 'テンション上がってきた！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e10', text: 'その熱、伝わってる！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e11', text: 'ノリノリだね、いいぞ！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic', 'rhythm'] },
  { id: 'e12', text: '会場（あなたの部屋）が沸いてる！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e13', text: 'グッドバイブス継続中', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic', 'flow'] },
  { id: 'e14', text: '弾んでる、心も体も', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e15', text: '今日のMVPはあなたで決まり', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },
  { id: 'e16', text: 'その勢い、もらった！', phase: 'any', tone: 'energetic', intensity: 3, tags: ['energetic'] },

  // ---- any / focused ----
  { id: 'fc7', text: '静けさの中の集中、いいね', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus'] },
  { id: 'fc8', text: '視線は前、心は今', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus'] },
  { id: 'fc9', text: 'ひとつの動きに、ひとつの呼吸', phase: 'any', tone: 'focused', intensity: 2, tags: ['focus', 'breath'] },
  { id: 'fc10', text: 'ノイズが消えていく感覚', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus'] },
  { id: 'fc11', text: '集中の波、キープできてる', phase: 'any', tone: 'focused', intensity: 3, tags: ['focus', 'flow'] },
  { id: 'fc12', text: '丁寧さは速さに勝る', phase: 'any', tone: 'focused', intensity: 2, tags: ['focus'] },

  // ---- any / calm ----
  { id: 'c07', text: 'ゆったり、でも確かに', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c08', text: '心拍と対話しながら', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm', 'breath'] },
  { id: 'c09', text: '静かな達成感を積もう', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm', 'progress'] },
  { id: 'c10', text: '穏やかさも強さのかたち', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c11', text: '深いところで整ってきた', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'c12', text: 'この時間、贅沢だね', phase: 'any', tone: 'calm', intensity: 1, tags: ['calm'] },

  // ---- combo ----
  { id: 'cb5', text: '連鎖が気持ちいい', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo'] },
  { id: 'cb6', text: '途切れないね、見事', phase: 'any', tone: 'focused', intensity: 3, tags: ['combo'] },
  { id: 'cb7', text: 'コンボの波に乗ってる', phase: 'any', tone: 'energetic', intensity: 3, tags: ['combo', 'flow'] },
  { id: 'cb8', text: '続いた分だけ自信になる', phase: 'any', tone: 'gentle', intensity: 3, tags: ['combo'] },

  // ---- clear ----
  { id: 'cl4', text: 'またひとつ越えたね', phase: 'any', tone: 'gentle', intensity: 3, tags: ['clear'] },
  { id: 'cl5', text: 'クリアの音が聞こえた気がする', phase: 'any', tone: 'energetic', intensity: 3, tags: ['clear'] },
  { id: 'cl6', text: '順調に章が進んでる', phase: 'any', tone: 'calm', intensity: 3, tags: ['clear', 'progress'] },

  // ---- recover ----
  { id: 'r05', text: '肩、上がってない？ふっと緩めよう', phase: 'any', tone: 'calm', intensity: 1, tags: ['recover', 'relax'] },
  { id: 'r06', text: '水分チャージも作戦のうち', phase: 'any', tone: 'gentle', intensity: 1, tags: ['recover'] },
  { id: 'r07', text: 'リセットしてもゲームは続く', phase: 'any', tone: 'gentle', intensity: 1, tags: ['recover'] },
  { id: 'r08', text: '呼吸が整えば、また進める', phase: 'any', tone: 'calm', intensity: 2, tags: ['recover', 'breath'] },

  // ---- short ----
  { id: 'sh4', text: '短距離走も立派なトレーニング', phase: 'any', tone: 'gentle', intensity: 2, tags: ['short'] },
  { id: 'sh5', text: '濃い一瞬にしよう', phase: 'any', tone: 'focused', intensity: 3, tags: ['short'] },
  { id: 'sh6', text: '短くても完走は完走', phase: 'any', tone: 'energetic', intensity: 3, tags: ['short'] },

  // ---- long ----
  { id: 'lg4', text: '長い旅ほど、着いた時がうれしい', phase: 'any', tone: 'gentle', intensity: 2, tags: ['long'] },
  { id: 'lg5', text: 'ペース配分、うまくなってる', phase: 'any', tone: 'focused', intensity: 2, tags: ['long', 'pace'] },
  { id: 'lg6', text: '遠くまで来たね', phase: 'any', tone: 'calm', intensity: 3, tags: ['long', 'progress'] },

  // ---- 汎用の後押し ----
  { id: 'a11', text: '過去のあなたが今日を応援してる', phase: 'any', tone: 'gentle', intensity: 3, tags: ['progress'] },
  { id: 'a12', text: '積み重ねは静かに効いてくる', phase: 'any', tone: 'calm', intensity: 2, tags: ['progress'] },
  { id: 'a13', text: '今日の一歩は明日の助走', phase: 'any', tone: 'focused', intensity: 3, tags: ['progress'] },
  { id: 'a14', text: 'この画面の言葉、全部本心だよ', phase: 'any', tone: 'gentle', intensity: 2, tags: ['together'] },
  { id: 'a15', text: '続きはまだある、楽しみだね', phase: 'any', tone: 'energetic', intensity: 2, tags: ['progress'] },
  { id: 'a16', text: 'いい汗の予感', phase: 'any', tone: 'energetic', intensity: 2, tags: ['energetic'] },
  { id: 'a17', text: '動いた時間は消えない', phase: 'any', tone: 'focused', intensity: 3, tags: ['progress'] },
  { id: 'a18', text: '記録より記憶に残る時間を', phase: 'any', tone: 'calm', intensity: 2, tags: ['calm'] },
  { id: 'a19', text: 'ここまでのあなた、ちゃんと見てたよ', phase: 'any', tone: 'gentle', intensity: 3, tags: ['together'] },
  { id: 'a20', text: '完走の先の爽快感、取りに行こう', phase: 'any', tone: 'energetic', intensity: 3, tags: ['progress'] },
];
