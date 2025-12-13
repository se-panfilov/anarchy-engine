import type { IAbstractEntityRegistry, IProtectedRegistry, IReactiveFactory, IWrapper } from '@/Engine/Abstract';
import type { ISceneWrapper } from '@/Engine/Scene';

// export type IAbstractSpaceService<E, C, P> = Readonly<{
//   create: (params: Record<string, any>) => IWrapper<E>;
//   createFromConfig: (config: ReadonlyArray<C>) => void;
//   setActive: (id: string) => void;
//   findActive: () => IWrapper<E> | undefined;
//   getFactory: () => IReactiveFactory<IWrapper<E>, P>;
//   getRegistry: () => IProtectedRegistry<IAbstractEntityRegistry<IWrapper<E>>>;
// }> &
//   IDestroyable;

export type IWithCreateService<W, P> = Readonly<{
  create: (params: P) => W;
}>;

export type IWithCreateAsyncService<W, P> = Readonly<{
  createAsync: (params: P) => Promise<W>;
}>;

export type IWithCreateFromConfigService<C> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>) => void;
}>;

export type IWithActiveAccessorsService<W> = Readonly<{
  setActive: (id: string) => void;
  findActive: () => W | undefined;
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
