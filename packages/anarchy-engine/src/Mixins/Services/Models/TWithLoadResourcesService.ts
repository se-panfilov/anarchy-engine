import type { TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';

export type TWithLoadResourcesService<C extends TAbstractResourceConfig, T> = Readonly<{
  load: (config: C, ...rest: any) => T;
  loadFromConfig: (configs: ReadonlyArray<C>) => ReadonlyArray<T>;
}>;
