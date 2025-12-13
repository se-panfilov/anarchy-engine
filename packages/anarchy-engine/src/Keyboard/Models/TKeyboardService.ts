import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TKeysPressingEvent } from '@Anarchy/Engine/Keyboard';
import type { Observable } from 'rxjs';

import type { TGameKey } from './TGameKey';

export type TKeyboardService = TAbstractService &
  Readonly<{
    combo$: Observable<ReadonlySet<TGameKey>>;
    pressing$: Observable<TKeysPressingEvent>;
    pressed$: Observable<KeyboardEvent>;
    released$: Observable<KeyboardEvent>;
    currentKeys: ReadonlySet<TGameKey>;
  }>;
