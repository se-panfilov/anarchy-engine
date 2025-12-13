import type { Subject } from 'rxjs';

export interface ReactiveWrapper<T> {
  readonly id: string;
  readonly entity: T;
  readonly destroyed$: Subject<void>;
}
