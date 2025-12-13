import type { Observable } from 'rxjs';

import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';
import type { RegistryType } from '@/Engine/Registries';

export type IAbstractRegistry<T extends IRegistrable> = Readonly<{
  id: string;
  type: RegistryType | string;
  add: (entity: T) => void;
  added$: Observable<T>;
  replace: (entity: T) => void;
  replaced$: Observable<T>;
  registry: Map<string, T>;
  getById: (id: string) => T | undefined;
  getAll: () => ReadonlyArray<T>;
  getAllWithSomeTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getAllWithEveryTag: (tags: ReadonlyArray<string>) => ReadonlyArray<T> | never;
  getUniqWithSomeTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqWithEveryTag: (tags: ReadonlyArray<string>) => T | undefined | never;
  getUniqByTag: (tag: string) => T | undefined | never;
  isEmpty: () => boolean;
  remove: (id: string) => void;
  removed$: Observable<T>;
}> &
  IDestroyable;
