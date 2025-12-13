import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TKeysEvent } from '@Anarchy/Engine/Keyboard/Models/TKeysEvent';
import type { Observable } from 'rxjs';

import type { TKeysState } from './TKeysState';

export type TKeyboardService = TAbstractService &
  Readonly<{
    keys$: Observable<TKeysEvent>;
    currentKeys: TKeysState;
    pressed$: Observable<KeyboardEvent>;
    released$: Observable<KeyboardEvent>;
  }>;
