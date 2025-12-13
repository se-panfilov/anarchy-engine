import type { Subject } from 'rxjs';

import type { TRegistryPack } from './TRegistryPack';

export type TWithReactiveRegistry<T> = {
  added$: Subject<TRegistryPack<T>>;
  removed$: Subject<TRegistryPack<T>>;
  replaced$: Subject<TRegistryPack<T>>;
};
