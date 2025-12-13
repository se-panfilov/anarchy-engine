import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractSimpleAsyncRegistry<T> = TAbstractSimpleRegistry<T> &
  Readonly<{
    findByNameAsync: (name: string) => Promise<T | undefined>;
    findByName$: (name: string) => Observable<T>;
  }> &
  TDestroyable;
