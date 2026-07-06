import type { CheerMessageTemplate } from './messageTypes';
import { supportMessages } from './supportMessages';

/**
 * 全メッセージ資産の集約点。
 * サバイバルモード用メッセージを追加する場合はここに concat する。
 */
export const messageBank: CheerMessageTemplate[] = [...supportMessages];

export function getMessagesByPhase(
  phase: CheerMessageTemplate['phase'],
): CheerMessageTemplate[] {
  return messageBank.filter((m) => m.phase === phase || m.phase === 'any');
}
