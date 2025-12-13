import type { Subject } from 'rxjs';
import type { ReactiveWrapper } from '@Engine/Models';

export interface Registry<T extends ReactiveWrapper<unknown>> {
  readonly id: string;
  readonly add$: Subject<T>;
  readonly replace$: Subject<T>;
  readonly get$: Subject<string>;
  readonly remove$: Subject<string>;
  readonly destroy$: Subject<void>;
}
