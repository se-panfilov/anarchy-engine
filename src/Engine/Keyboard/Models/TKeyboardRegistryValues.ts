import type { Subject } from 'rxjs';

import type { TKeyboardPressingEvent } from './TKeyboardPressingEvent';

export type TKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<TKeyboardPressingEvent>;
  released$: Subject<string>;
};
