import type { IGameKey } from './IGameKey';
import type { IKeySubscription } from './IKeySubscription';

export type IKeyboardService = {
  onKey: (key: IGameKey) => IKeySubscription;
  onKeyCombo: (combo: string) => IKeySubscription;
  removeKeyBinding: (key: IGameKey) => void;
  removeKeyComboBinding: (combo: string) => void;
  pauseKeyBinding: (key: IGameKey) => void;
  pauseKeyComboBinding: (combo: string) => void;
  resumeKeyBinding: (key: IGameKey) => void;
  resumeKeyComboBinding: (combo: string) => void;
  isKeyPressed: (key: IGameKey) => boolean;
  isKeyComboPressed: (combo: string) => boolean;
};
