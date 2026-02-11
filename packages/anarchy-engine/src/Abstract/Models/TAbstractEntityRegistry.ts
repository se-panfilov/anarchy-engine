import type { LookUpStrategy } from '@Anarchy/Engine/Abstract/Registries/Constants';
import type { TDestroyable, TRegistrable } from '@Anarchy/Engine/Mixins';

import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractEntityRegistry<T extends TRegistrable> = Omit<TAbstractSimpleRegistry<T>, 'add' | 'replace' | 'remove' | 'findByKey' | 'getByKey'> &
  Readonly<{
    add: (entity: T) => void;
    asObject: () => Record<string, T>;
    find: (predicate: (value: T, key: string) => boolean) => T | undefined;
    findAllByTag: (tag: string) => ReadonlyArray<T>;
    findAllByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => ReadonlyArray<T>;
    findAllWithNames: (names: ReadonlyArray<string>) => ReadonlyArray<T>;
    findById: (id: string) => T | undefined;
    findByName: (name: string) => T | undefined;
    findByTag: (tag: string) => T | undefined | never;
    findByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => T | undefined | never;
    get: (predicate: (value: T, key: string) => boolean) => T | never;
    getById: (id: string) => T | never;
    getByName: (name: string) => T | never;
    getByTag: (tag: string) => T | never;
    getByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => T | never;
    remove: (id: string) => void;
    replace: (entity: T) => void;
  }> &
  TDestroyable;
