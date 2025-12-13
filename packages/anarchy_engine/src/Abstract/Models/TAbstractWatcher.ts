import type { WatcherType } from '@Engine/Abstract';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@Engine/Mixins';
import type { BehaviorSubject, Subject } from 'rxjs';

export type TAbstractWatcher<T> = Readonly<{
  type: WatcherType | string;
  enabled$: BehaviorSubject<boolean>;
  value$: Subject<T>;
}> &
  TWithNameAndNameAccessorsMixin &
  TRegistrable &
  TDestroyable &
  TNoSpread;
