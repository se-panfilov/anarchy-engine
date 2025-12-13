import type { TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';

export type TWithLoadResourcesAsyncService<C extends TAbstractResourceConfig, T> = Readonly<{
  loadAsync: (config: C, onProgress?: (event: ProgressEvent) => void) => Promise<T>;
  loadFromConfigAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
}>;
