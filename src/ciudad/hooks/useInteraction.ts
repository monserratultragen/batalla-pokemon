import { useState, useCallback } from 'react';
import type { NPCData, DialogLine, PlayerState } from '../types';

interface UseInteractionOptions {
  player: PlayerState;
  npcs: NPCData[];
}

export function useInteraction({ player, npcs }: UseInteractionOptions) {
  const [interactedNPC, setInteractedNPC] = useState<NPCData | null>(null);
  const [dialogQueue, setDialogQueue] = useState<DialogLine[]>([]);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [isDialogActive, setIsDialogActive] = useState(false);

  const getFacingNPC = useCallback((): NPCData | null => {
    const directionOffsets: Record<string, { dx: number; dy: number }> = {
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
    };

    const { dx, dy } = directionOffsets[player.direction];
    const targetX = player.x + dx;
    const targetY = player.y + dy;

    return npcs.find(npc => npc.x === targetX && npc.y === targetY) || null;
  }, [player, npcs]);

  const startDialog = useCallback((npc: NPCData) => {
    setInteractedNPC(npc);
    setDialogQueue(npc.dialog);
    setCurrentDialogIndex(0);
    setIsDialogActive(true);
  }, []);

  const advanceDialog = useCallback((): DialogLine | null => {
    if (!isDialogActive || dialogQueue.length === 0) {
      return null;
    }

    const currentDialog = dialogQueue[currentDialogIndex];

    if (currentDialogIndex < dialogQueue.length - 1) {
      setCurrentDialogIndex(prev => prev + 1);
    } else {
      endDialog();
    }

    return currentDialog;
  }, [isDialogActive, dialogQueue, currentDialogIndex]);

  const endDialog = useCallback(() => {
    setInteractedNPC(null);
    setDialogQueue([]);
    setCurrentDialogIndex(0);
    setIsDialogActive(false);
  }, []);

  const tryInteract = useCallback((): boolean => {
    if (isDialogActive) {
      advanceDialog();
      return true;
    }

    const npc = getFacingNPC();
    if (npc) {
      startDialog(npc);
      return true;
    }

    return false;
  }, [isDialogActive, getFacingNPC, startDialog, advanceDialog]);

  const currentDialog = isDialogActive && dialogQueue.length > 0
    ? dialogQueue[currentDialogIndex]
    : null;

  return {
    interactedNPC,
    isDialogActive,
    currentDialog,
    currentDialogIndex,
    dialogQueue,
    tryInteract,
    advanceDialog,
    endDialog,
    startDialog,
  };
}
