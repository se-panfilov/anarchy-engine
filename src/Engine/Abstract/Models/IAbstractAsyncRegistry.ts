import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

import type { IAbstractRegistry } from './IAbstractRegistry';

export type IAbstractAsyncRegistry<T extends IRegistrable> = IAbstractRegistry<T> &
  Readonly<{
    getUniqWithSomeTagAsync: (tags: ReadonlyArray<string>) => Promise<T>;
    getUniqWithEveryTagAsync: (tags: ReadonlyArray<string>) => Promise<T>;
    getUniqByTagAsync: (tag: string) => Promise<T>;
  }> &
  IDestroyable;
