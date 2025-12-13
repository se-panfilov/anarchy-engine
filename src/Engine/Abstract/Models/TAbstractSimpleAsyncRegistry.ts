import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractSimpleAsyncRegistry<T> = TAbstractSimpleRegistry<T> &
  Readonly<{
    findByKeyAsync: (name: string) => Promise<T | undefined>;
    findByKey$: (name: string) => Observable<T>;
  }> &
  TDestroyable;
