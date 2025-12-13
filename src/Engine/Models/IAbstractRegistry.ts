import type { Subject } from 'rxjs';
import type { IReactiveWrapper } from '@Engine/Models';

export interface IAbstractRegistry<T extends IReactiveWrapper<unknown>> {
  readonly id: string;
  readonly add$: Subject<T>;
  readonly replace$: Subject<T>;
  readonly registry: Map<string, T>;
  readonly getById: (id: string) => T;
  readonly remove$: Subject<string>;
  readonly destroy$: Subject<void>;
}
