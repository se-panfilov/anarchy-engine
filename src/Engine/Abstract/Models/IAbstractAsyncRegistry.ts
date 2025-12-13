import type { Observable } from 'rxjs';

import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractEntityRegistry } from './IAbstractEntityRegistry';

export type IAbstractAsyncRegistry<T extends IRegistrable> = Omit<IAbstractEntityRegistry<T>, 'findByTags' | 'findByTag'> &
  Readonly<{
    findByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T>;
    findByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    findByTagAsync: (tag: string) => Promise<T>;
    findByTag$: (tag: string) => Observable<T>;
  }> &
  IDestroyable;
