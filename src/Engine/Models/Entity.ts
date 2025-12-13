import type { Subject } from 'rxjs';

export interface Entity<T> {
  readonly id: string;
  readonly entity: T | undefined;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
