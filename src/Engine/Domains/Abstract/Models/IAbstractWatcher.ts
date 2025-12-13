import type { IDestroyable, IRegistrable } from '@Engine/Domains/Mixins';
import type { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Domains/Abstract';

export type IAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  value$: Subject<T>;
}> &
  IRegistrable &
  IDestroyable;
