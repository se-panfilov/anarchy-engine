import type { LookUpStrategy } from '@/Engine/Abstract/Registries/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractSimpleRegistry } from './IAbstractSimpleRegistry';

export type IAbstractEntityRegistry<T extends IRegistrable> = Omit<IAbstractSimpleRegistry<T>, 'add' | 'replace' | 'remove' | 'getByKey'> &
  Readonly<{
    add: (entity: T) => void;
    replace: (entity: T) => void;
    remove: (id: string) => void;
    findById: (id: string) => T | undefined;
    findByName: (name: string) => T | undefined;
    find: (predicate: (value: T, key: string) => boolean) => T | undefined;
    findAllByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => ReadonlyArray<T>;
    findAllByTag: (tag: string) => ReadonlyArray<T>;
    findByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => T | undefined | never;
    findByTag: (tag: string) => T | undefined | never;
  }> &
  IDestroyable;
