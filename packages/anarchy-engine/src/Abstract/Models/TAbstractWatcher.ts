import type { WatcherType } from '@Anarchy/Engine/Abstract/Constants';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@Anarchy/Engine/Mixins';
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
