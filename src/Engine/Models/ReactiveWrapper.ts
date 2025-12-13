import type { Subject } from 'rxjs';

export interface ReactiveWrapper<T> {
  readonly id: string;
  readonly entity: T;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
