import type { TReactiveFactory } from '@/Abstract';

export type TWithFactoryService<T, P, D, F extends TReactiveFactory<T, P, D>> = Readonly<{
  getFactory: () => F;
}>;
