import type { LookUpStrategy } from '@/Engine/Abstract/Registries/Constants';
import type { TDestroyable, TRegistrable } from '@/Engine/Mixins';

import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractEntityRegistry<T extends TRegistrable> = Omit<TAbstractSimpleRegistry<T>, 'add' | 'replace' | 'remove' | 'findByKey'> &
  Readonly<{
    add: (entity: T) => void;
    find: (predicate: (value: T, key: string) => boolean) => T | undefined;
    findAllByTag: (tag: string) => ReadonlyArray<T>;
    findAllByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => ReadonlyArray<T>;
    findById: (id: string) => T | undefined;
    findAllWithNames: (names: ReadonlyArray<string>) => ReadonlyArray<T>;
    findByName: (name: string) => T | undefined;
    findByTag: (tag: string) => T | undefined | never;
    findByTags: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => T | undefined | never;
    asObject: () => Record<string, T>;
    remove: (id: string) => void;
    replace: (entity: T) => void;
  }> &
  TDestroyable;
