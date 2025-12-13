import type { IKeySubscription } from './IKeySubscription';

export type IKeyboardService = {
  onKey: (key: string) => IKeySubscription;
  removeKeyBinding: (key: string) => void;
  pauseKeyBinding: (key: string) => void;
  resumeKeyBinding: (key: string) => void;
};
