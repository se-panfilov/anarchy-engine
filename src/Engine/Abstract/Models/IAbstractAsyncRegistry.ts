import type { TagSelector } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractRegistry } from './IAbstractRegistry';

export type IAbstractAsyncRegistry<T extends IRegistrable> = IAbstractRegistry<T> &
  Readonly<{
    getUniqByTagsAsync: (tags: ReadonlyArray<string>, selector: TagSelector) => Promise<T>;
    getUniqByTagAsync: (tag: string) => Promise<T>;
  }> &
  IDestroyable;
