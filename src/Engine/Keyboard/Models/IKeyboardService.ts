import type { Key } from 'ts-key-enum';

import type { IKeySubscription } from './IKeySubscription';

export type IKeyboardService = {
  onKey: (key: Key) => IKeySubscription;
  onKeyCombo: (combo: string) => IKeySubscription;
  removeKeyBinding: (key: Key) => void;
  removeKeyComboBinding: (combo: string) => void;
  pauseKeyBinding: (key: Key) => void;
  pauseKeyComboBinding: (combo: string) => void;
  resumeKeyBinding: (key: Key) => void;
  resumeKeyComboBinding: (combo: string) => void;
  isKeyPressed: (key: Key) => boolean;
  isKeyComboPressed: (combo: string) => boolean;
};
