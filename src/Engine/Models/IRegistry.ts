import type { Subject } from 'rxjs';
import type { IReactiveWrapper } from '@Engine/Models';

export interface IRegistry<T extends IReactiveWrapper<unknown>> {
  readonly id: string;
  readonly add$: Subject<T>;
  readonly replace$: Subject<T>;
  readonly get$: Subject<string>;
  readonly remove$: Subject<string>;
  readonly destroy$: Subject<void>;
}
