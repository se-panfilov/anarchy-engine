import type { IKeySubscription } from './IKeySubscription';

export type IKeyboardService = {
  onKey: (key: string) => IKeySubscription;
  onKeyCombo: (combo: string) => IKeySubscription;
  removeKeyBinding: (key: string) => void;
  removeKeyComboBinding: (combo: string) => void;
  pauseKeyBinding: (key: string) => void;
  pauseKeyComboBinding: (combo: string) => void;
  resumeKeyBinding: (key: string) => void;
  resumeKeyComboBinding: (combo: string) => void;
  isKeyPressed: (key: string) => boolean;
  isKeyComboPressed: (combo: string) => boolean;
};
