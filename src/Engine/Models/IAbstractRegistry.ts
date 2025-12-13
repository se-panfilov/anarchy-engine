import type { IDestroyable, IRegistrable } from '@Engine/Models';
import type { Subject } from 'rxjs';

export type IAbstractRegistry<T extends IRegistrable> = Readonly<{
  id: string;
  add: (entity: T) => void;
  added$: Subject<T>;
  replace: (entity: T) => void;
  replaced$: Subject<T>;
  registry: ReadonlyMap<string, T>;
  getById: (id: string) => T | undefined;
  getAllWithSomeTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getAllWithEveryTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getUniqWithSomeTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqWithEveryTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqByTag: (tag: string) => T | undefined | never;
  remove: (id: string) => void;
  removed$: Subject<T>;
}> &
  IDestroyable;
