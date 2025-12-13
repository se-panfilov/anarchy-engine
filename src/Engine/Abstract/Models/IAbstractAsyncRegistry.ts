import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractRegistry } from './IAbstractRegistry';
import type { IAsyncEntityGetter } from './IAsyncEntityGetter';

export type IAbstractAsyncRegistry<T extends IRegistrable> = IAbstractRegistry<T> &
  Readonly<{
    getUniqByTagsAsync: (tags: ReadonlyArray<string>, strategy: LookUpStrategy) => IAsyncEntityGetter<T>;
    getUniqByTagAsync: (tag: string) => IAsyncEntityGetter<T>;
  }> &
  IDestroyable;
