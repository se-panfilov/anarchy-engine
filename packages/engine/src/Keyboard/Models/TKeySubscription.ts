import type { Observable } from 'rxjs';

import type { TGameKey } from './TGameKey';
import type { TKeyboardPressingEvent } from './TKeyboardPressingEvent';
import type { TKeyCombo } from './TKeyCombo';

export type TKeySubscription = {
  pressed$: Observable<TGameKey | TKeyCombo>;
  pressing$: Observable<TKeyboardPressingEvent>;
  released$: Observable<TGameKey | TKeyCombo>;
};
