import type { TAbstractHooks, TReactiveFactory } from '@/Engine/Abstract';

export type TWithFactoryService<T, P, D, F extends TReactiveFactory<T, P, D, H>, H extends TAbstractHooks> = Readonly<{
  getFactory: () => F;
}>;
