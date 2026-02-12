import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TKeyEvent } from '@Anarchy/Engine/Keyboard/Models/TKeyEvent';
import type { Observable } from 'rxjs';

import type { TKeysCombo } from './TKeysCombo';

export type TKeyboardService = TAbstractService &
  Readonly<{
    keys$: Observable<TKeyEvent>;
    currentKeys: TKeysCombo;
    pressed$: Observable<KeyboardEvent>;
    released$: Observable<KeyboardEvent>;
  }>;
