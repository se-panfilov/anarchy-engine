import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TKeyEvent } from '@hellpig/anarchy-engine/Keyboard/Models';
import type { Observable } from 'rxjs';

import type { TKeysCombo } from './TKeysCombo';

export type TKeyboardService = TAbstractService &
  Readonly<{
    keys$: Observable<TKeyEvent>;
    currentKeys: TKeysCombo;
    pressed$: Observable<KeyboardEvent>;
    released$: Observable<KeyboardEvent>;
  }>;
