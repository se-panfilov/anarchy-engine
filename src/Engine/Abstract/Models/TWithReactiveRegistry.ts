import type { Subject } from 'rxjs';

import type { TAbstractRegistryPack } from './TAbstractRegistryPack';

export type TWithReactiveRegistry<T> = {
  added$: Subject<TAbstractRegistryPack<T>>;
  removed$: Subject<TAbstractRegistryPack<T>>;
  replaced$: Subject<TAbstractRegistryPack<T>>;
};
