import type { TReactiveFactory } from '@Engine/Abstract';

export type TWithFactoryService<T, P, D, F extends TReactiveFactory<T, P, D, O>, O extends Record<string, any> | undefined = undefined> = Readonly<{
  getFactory: () => F;
}>;
