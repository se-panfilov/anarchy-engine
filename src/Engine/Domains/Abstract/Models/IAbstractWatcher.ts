import type { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Domains/Abstract';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

export type IAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  value$: Subject<T>;
}> &
  IRegistrable &
  IDestroyable;
