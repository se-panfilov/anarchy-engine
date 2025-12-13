import type { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract';
import type { IDestroyable, IRegistrable, IWithNameAndNameAccessors } from '@/Engine/Mixins';

export type IAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  value$: Subject<T>;
}> &
  IWithNameAndNameAccessors &
  IRegistrable &
  IDestroyable;
