import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractSimpleRegistry } from './IAbstractSimpleRegistry';

export type IAbstractEntityRegistry<T extends IRegistrable> = Omit<IAbstractSimpleRegistry<T>, 'add' | 'replace' | 'remove' | 'getByKey'> &
  Readonly<{
    add: (entity: T) => void;
    replace: (entity: T) => void;
    remove: (id: string) => void;
    getById: (id: string) => T | undefined;
    getAllByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => ReadonlyArray<T>;
    getAllByTag: (tag: string) => ReadonlyArray<T>;
    getUniqByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => T | undefined | never;
    getUniqByTag: (tag: string) => T | undefined | never;
  }> &
  IDestroyable;
