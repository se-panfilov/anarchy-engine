import type { IDestroyable, IRegistrable } from '@Engine/Domains/Mixins';
import type { Subject } from 'rxjs';

import type { RegistryName } from '@/Engine/Registries';

export type IAbstractRegistry<T extends IRegistrable> = Readonly<{
  id: string;
  name: RegistryName;
  add: (entity: T) => void;
  added$: Subject<T>;
  replace: (entity: T) => void;
  replaced$: Subject<T>;
  registry: Map<string, T>;
  getById: (id: string) => T | undefined;
  getAll: () => ReadonlyArray<T>;
  getAllWithSomeTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getAllWithEveryTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getUniqWithSomeTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqWithEveryTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqByTag: (tag: string) => T | undefined | never;
  remove: (id: string) => void;
  removed$: Subject<T>;
}> &
  IDestroyable;
