import type { Subject } from 'rxjs';

export interface IWatcher<T> {
  readonly id: string;
  readonly type: string;
  readonly value$: Subject<T>;
  readonly start$: Subject<void>;
  readonly stop$: Subject<void>;
  readonly destroy$: Subject<void>;
}
