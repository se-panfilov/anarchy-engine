import type { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract';
import type { IWithNameAndNameAccessorsMixin, TDestroyable, TRegistrable } from '@/Engine/Mixins';

export type TAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  value$: Subject<T>;
}> &
  IWithNameAndNameAccessorsMixin &
  TRegistrable &
  TDestroyable;
