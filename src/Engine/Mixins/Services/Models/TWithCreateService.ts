import type { TAbstractHooks } from '@/Engine/Abstract';

export type TCreateFromServiceFn<T, P, H extends TAbstractHooks = undefined> = (params: P, hooks?: H) => T;

export type TWithCreateService<T, P, H extends TAbstractHooks = undefined> = Readonly<{
  create: TCreateFromServiceFn<T, P, H>;
  createFromList: (params: ReadonlyArray<P>, hooks?: H) => ReadonlyArray<T>;
}>;
