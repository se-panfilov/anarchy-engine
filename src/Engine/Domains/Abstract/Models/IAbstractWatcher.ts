import type { IRegistrable } from '@Engine/Domains/Mixins';
import type { Subject } from 'rxjs';

export type IAbstractWatcher<T> = Readonly<{
  type: string;
  value$: Subject<T>;
  destroy$: Subject<void>;
}> &
  IRegistrable;
