import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAbstractResourceConfig } from './TAbstractResourceConfig';
import type { TAbstractSerializeDependencies } from './TAbstractSerializeDependencies';
import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractResourceAsyncRegistry<T> = Omit<TAbstractSimpleRegistry<T>, 'serialize'> &
  Readonly<{
    findByKey$: (name: string) => Observable<T>;
    findByKeyAsync: (name: string) => Promise<T | undefined>;
    getByKeyAsync: (name: string) => Promise<T | never>;
    serialize: <C extends TAbstractResourceConfig>(dependencies: TAbstractSerializeDependencies<C>) => ReadonlyArray<C>;
  }> &
  TDestroyable;
