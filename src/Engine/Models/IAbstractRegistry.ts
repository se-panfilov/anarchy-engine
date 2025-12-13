import type { IWrapper } from '@Engine/Models';
import type { Subject } from 'rxjs';

export interface IAbstractRegistry<T extends IWrapper<unknown>> {
  readonly id: string;
  readonly add: (entity: T) => void;
  readonly added$: Subject<T>;
  readonly replace: (entity: T) => void;
  readonly replaced$: Subject<T>;
  readonly registry: Map<string, T>;
  readonly getById: (id: string) => T | undefined;
  readonly remove: (id: string) => void;
  readonly removed$: Subject<T>;
  readonly destroy: () => void;
}
