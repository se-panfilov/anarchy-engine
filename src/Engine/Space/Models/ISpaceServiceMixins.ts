import type { Observable } from 'rxjs';

import type { ISceneWrapper } from '@/Engine/Scene';

export type IWithCreateService<W, P> = Readonly<{
  create: (params: P) => W;
}>;

export type IWithCreateAsyncService<W, P> = Readonly<{
  createAsync: (params: P) => Promise<W>;
}>;

export type IWithCreateFromConfigService<C> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>) => void;
}>;

export type IWithCreateFromConfigAsyncService<C> = Readonly<{
  createFromConfigAsync: (config: ReadonlyArray<C>) => Promise<void>;
}>;

export type IWithActiveAccessorsService<W> = Readonly<{
  setActive: (id: string) => void;
  findActive: () => W | undefined;
  active$: Observable<W | undefined>;
}>;

export type IWithFactoryService<F> = Readonly<{
  getFactory: () => F;
}>;

export type IWithRegistryService<R> = Readonly<{
  getRegistry: () => R;
}>;

export type IWithSceneGetterService = Readonly<{
  getScene: () => ISceneWrapper;
}>;
