import type { LookUpStrategy } from '@/Engine/Abstract/Registries/Constants';
import type { TDestroyable, TRegistrable } from '@/Engine/Mixins';

import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractEntityRegistry<T extends TRegistrable> = Omit<TAbstractSimpleRegistry<T>, 'add' | 'replace' | 'remove' | 'findByKey'> &
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
  TDestroyable;
