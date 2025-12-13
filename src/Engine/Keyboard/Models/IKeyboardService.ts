import type { IGameKey } from './IGameKey';
import type { IKeyCombo } from './IKeyCombo';
import type { IKeySubscription } from './IKeySubscription';

export type IKeyboardService = Readonly<{
  onKey: (key: IGameKey) => IKeySubscription;
  onKeyCombo: (combo: IKeyCombo) => IKeySubscription;
  removeKeyBinding: (key: IGameKey) => void;
  removeKeyComboBinding: (combo: IKeyCombo) => void;
  pauseKeyBinding: (key: IGameKey) => void;
  pauseKeyComboBinding: (combo: IKeyCombo) => void;
  resumeKeyBinding: (key: IGameKey) => void;
  resumeKeyComboBinding: (combo: IKeyCombo) => void;
  isKeyPressed: (key: IGameKey) => boolean;
  isKeyComboPressed: (combo: IKeyCombo) => boolean;
}>;
