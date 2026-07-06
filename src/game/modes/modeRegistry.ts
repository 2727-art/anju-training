import type { GameModeId, ModeEngine } from './types';
import { supportMode } from './supportMode';
import { survivalMode } from './survivalMode';

/** 新モードはここに追加するだけでモード選択UIに反映される */
export const allModes: readonly ModeEngine[] = [supportMode, survivalMode];

export function getMode(id: GameModeId): ModeEngine {
  const mode = allModes.find((m) => m.id === id);
  if (!mode) throw new Error(`unknown mode: ${id}`);
  return mode;
}
