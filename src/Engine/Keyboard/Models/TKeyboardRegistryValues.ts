import type { Subject } from 'rxjs';

import type { TKeyCombo } from '@/Engine/Keyboard';
import type { TGameKey } from '@/Engine/Keyboard/Models';
import type { TDelta } from '@/Engine/Loop';

export type TKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<Readonly<{ key: TGameKey | TKeyCombo; delta: TDelta }>>;
  released$: Subject<string>;
};
