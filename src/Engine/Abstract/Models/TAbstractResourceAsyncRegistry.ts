import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAbstractResourceConfig } from './TAbstractResourceConfig';
import type { TAbstractSerializeDependencies } from './TAbstractSerializeDependencies';
import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractResourceAsyncRegistry<T> = Omit<TAbstractSimpleRegistry<T>, 'serialize'> &
  Readonly<{
    findByKeyAsync: (name: string) => Promise<T | undefined>;
    findByKey$: (name: string) => Observable<T>;
    serialize: <C extends TAbstractResourceConfig>(dependencies: TAbstractSerializeDependencies<C>) => ReadonlyArray<C>;
  }> &
  TDestroyable;
