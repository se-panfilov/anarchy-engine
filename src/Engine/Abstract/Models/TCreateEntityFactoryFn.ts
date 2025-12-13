import type { TAbstractHooks } from '@/Engine/Abstract';

export type TCreateEntityFactoryFn<T, P, D = Record<string, any>, H extends TAbstractHooks = undefined> = (params: P, dependencies: D, hooks: H) => T;
