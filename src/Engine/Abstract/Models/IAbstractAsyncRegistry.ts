import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractRegistry } from './IAbstractRegistry';
import type { Observable } from 'rxjs';

export type IAbstractAsyncRegistry<T extends IRegistrable> = Omit<IAbstractRegistry<T>, 'getUniqByTags' | 'getUniqByTag'> &
  Readonly<{
    getUniqByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Promise<T>;
    getUniqByTagAsync: (tag: string) => Promise<T>;
    // getUniqByTags$: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => Observable<T>;
    // getUniqByTag$: (tag: string) => Observable<T>;
  }> &
  IDestroyable;
