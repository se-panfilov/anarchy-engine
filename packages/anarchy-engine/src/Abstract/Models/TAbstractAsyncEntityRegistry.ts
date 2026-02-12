import type { LookUpStrategy } from '@Anarchy/Engine/Abstract/Registries/Constants';
import type { TDestroyable, TRegistrable } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TAbstractEntityRegistry } from './TAbstractEntityRegistry';

export type TAbstractAsyncEntityRegistry<T extends TRegistrable> = TAbstractEntityRegistry<T> &
  Readonly<{
    findByName$: (name: string) => Observable<T>;
    findByNameAsync: (name: string) => Promise<T | undefined>;
    findByTag$: (tag: string) => Observable<T>;
    findByTagAsync: (tag: string) => Promise<T | undefined>;
    findByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    findByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T | undefined>;
    getByNameAsync: (name: string) => Promise<T | never>;
    getByTagAsync: (tag: string) => Promise<T | never>;
  }> &
  TDestroyable;
