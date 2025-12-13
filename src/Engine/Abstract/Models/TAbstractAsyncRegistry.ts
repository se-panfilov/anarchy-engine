import type { Observable } from 'rxjs';

import type { LookUpStrategy } from '@/Engine/Abstract/Registries/Constants';
import type { TDestroyable, TRegistrable } from '@/Engine/Mixins';

import type { TAbstractEntityRegistry } from './TAbstractEntityRegistry';

export type TAbstractAsyncRegistry<T extends TRegistrable> = TAbstractEntityRegistry<T> &
  Readonly<{
    findByName$: (name: string) => Observable<T>;
    findByNameAsync: (name: string) => Promise<T | undefined>;
    findByTag$: (tag: string) => Observable<T>;
    findByTagAsync: (tag: string) => Promise<T | undefined>;
    findByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    findByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T | undefined>;
  }> &
  TDestroyable;
