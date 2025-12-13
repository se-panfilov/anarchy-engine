import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TagSelector } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

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
  getAllByTags: (tags: ReadonlyArray<string>, selector: TagSelector) => ReadonlyArray<T>;
  getAllByTag: (tag: string) => ReadonlyArray<T>;
  getUniqByTags: (tags: ReadonlyArray<string>, selector: TagSelector) => T | undefined | never;
  getUniqByTag: (tag: string) => T | undefined | never;
  isEmpty: () => boolean;
  remove: (id: string) => void;
  removed$: Observable<T>;
}> &
  IDestroyable;
