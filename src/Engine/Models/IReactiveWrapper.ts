import type { Subject } from 'rxjs';

export interface IReactiveWrapper<T> {
  readonly id: string;
  readonly entity: T;
  readonly destroy$: Subject<void>;
}
