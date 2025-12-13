import type { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@/Engine/Mixins';

export type TAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  start$: Subject<void>;
  stop$: Subject<void>;
  value$: Subject<T>;
}> &
  TWithNameAndNameAccessorsMixin &
  TRegistrable &
  TDestroyable &
  TNoSpread;
