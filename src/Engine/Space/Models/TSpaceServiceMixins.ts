import type { Observable } from 'rxjs';

import type { TWithCreateAsync } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TWithCreateService<W, P> = Readonly<{
  create: (params: P) => W;
}>;

export type TWithCreateAsyncService<W, P> = TWithCreateAsync<W, P>;

export type TWithCreateFromConfigService<C> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>) => void;
}>;

export type TWithCreateFromConfigAsyncService<C, R> = Readonly<{
  createFromConfigAsync: (config: ReadonlyArray<C>) => Promise<R>;
}>;

export type TWithActiveAccessorsService<W> = Readonly<{
  setActive: (id: string) => void;
  findActive: () => W | undefined;
  active$: Observable<W | undefined>;
}>;

export type TWithFactoryService<F> = Readonly<{
  getFactory: () => F;
}>;

export type TWithRegistryService<R> = Readonly<{
  getRegistry: () => R;
}>;

export type TWithSceneGetterService = Readonly<{
  getScene: () => TSceneWrapper;
}>;
