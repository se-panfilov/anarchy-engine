import type { TAbstractHooks } from '@/Engine/Abstract';

export type TWithCreateFromConfigService<C, T, H extends TAbstractHooks = undefined> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>, hooks?: H) => ReadonlyArray<T>;
}>;
