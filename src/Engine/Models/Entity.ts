import type { Subject } from 'rxjs';

export interface Entity<T> {
  readonly id: string;
  readonly entity: T;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
