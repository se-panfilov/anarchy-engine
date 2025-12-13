import type { Subject } from 'rxjs';
import type { ReactiveWrapper } from '@Engine/Models';

export interface Factory<T extends ReactiveWrapper<unknown>, R extends Record<string, any>> {
  readonly id: string;
  readonly latest$: Subject<T>;
  readonly add$: Subject<R>;
  readonly destroyed$: Subject<void>;
}
