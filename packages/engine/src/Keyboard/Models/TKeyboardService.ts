import type { TAbstractService } from '@Engine/Abstract';

import type { TGameKey } from './TGameKey';
import type { TKeyCombo } from './TKeyCombo';
import type { TKeySubscription } from './TKeySubscription';

export type TKeyboardService = TAbstractService &
  Readonly<{
    onKey: (key: TGameKey) => TKeySubscription;
    onKeyCombo: (combo: TKeyCombo) => TKeySubscription;
    removeKeyBinding: (key: TGameKey) => void;
    removeKeyComboBinding: (combo: TKeyCombo) => void;
    pauseKeyBinding: (key: TGameKey) => void;
    pauseKeyComboBinding: (combo: TKeyCombo) => void;
    resumeKeyBinding: (key: TGameKey) => void;
    resumeKeyComboBinding: (combo: TKeyCombo) => void;
    isKeyPressed: (key: TGameKey) => boolean;
    isKeyComboPressed: (combo: TKeyCombo) => boolean;
  }>;
