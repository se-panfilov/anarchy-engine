import type { Subject } from 'rxjs';

import type { TKeysPressingEvent } from './TKeysPressingEvent';

export type TKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<TKeysPressingEvent>;
  released$: Subject<string>;
};
