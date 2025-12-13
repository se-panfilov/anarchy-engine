import type { IWrapper } from '@Engine/Models';
import type { Subject } from 'rxjs';

export type IAbstractRegistry<T extends IWrapper<unknown>> = Readonly<{
  id: string;
  add: (entity: T) => void;
  added$: Subject<T>;
  replace: (entity: T) => void;
  replaced$: Subject<T>;
  registry: Map<string, T>;
  getById: (id: string) => T | undefined;
  remove: (id: string) => void;
  removed$: Subject<T>;
  destroy: () => void;
}>;
