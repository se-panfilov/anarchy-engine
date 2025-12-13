import type { Subject } from 'rxjs';

export type IAbstractWatcher<T> = Readonly<{
  id: string;
  type: string;
  value$: Subject<T>;
  destroy$: Subject<void>;
}>;
