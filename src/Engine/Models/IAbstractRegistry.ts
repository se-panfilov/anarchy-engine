import type { IWrapper } from '@Engine/Models';
import type { Subject } from 'rxjs';

export type IAbstractRegistry<T extends IWrapper<unknown>> = Readonly<{
  id: string;
  add: (entity: T) => void;
  added$: Subject<T>;
  replace: (entity: T) => void;
  replaced$: Subject<T>;
  registry: ReadonlyMap<string, T>;
  getById: (id: string) => T | undefined;
  getAllWithTag: (tags: ReadonlyArray<string>, shouldMuchEveryTag?: boolean) => ReadonlyArray<T> | never;
  getUniqWithTag: (tags: ReadonlyArray<string>, shouldMuchEveryTag?: boolean) => T | undefined | never;
  remove: (id: string) => void;
  removed$: Subject<T>;
  destroy: () => void;
}>;
