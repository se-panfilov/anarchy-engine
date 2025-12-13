import type { TReactiveFactory } from '@Engine/Abstract';

export type TWithFactoryService<T, P, D, F extends TReactiveFactory<T, P, D>> = Readonly<{
  getFactory: () => F;
}>;
