import type { Observable } from 'rxjs';

import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractEntityRegistry } from './IAbstractEntityRegistry';

export type IAbstractAsyncRegistry<T extends IRegistrable> = Omit<IAbstractEntityRegistry<T>, 'getUniqByTags' | 'getUniqByTag'> &
  Readonly<{
    getUniqByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T>;
    getUniqByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    getUniqByTagAsync: (tag: string) => Promise<T>;
    getUniqByTag$: (tag: string) => Observable<T>;
  }> &
  IDestroyable;
