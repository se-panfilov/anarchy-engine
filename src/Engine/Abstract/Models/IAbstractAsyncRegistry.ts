import type { Observable } from 'rxjs';

import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractEntityRegistry } from './IAbstractEntityRegistry';

export type IAbstractAsyncRegistry<T extends IRegistrable> = IAbstractEntityRegistry<T> &
  Readonly<{
    findByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T | undefined>;
    findByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    findByTagAsync: (tag: string) => Promise<T | undefined>;
    findByTag$: (tag: string) => Observable<T>;
    findByNameAsync: (name: string) => Promise<T | undefined>;
    findByName$: (name: string) => Observable<T>;
  }> &
  IDestroyable;
