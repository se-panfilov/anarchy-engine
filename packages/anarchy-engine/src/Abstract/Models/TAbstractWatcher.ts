import type { WatcherType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@hellpig/anarchy-engine/Mixins';
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
