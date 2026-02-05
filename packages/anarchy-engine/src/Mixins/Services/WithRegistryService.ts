import type { TWithRegistryService } from '@hellpig/anarchy-engine/Mixins/Services/Models';

export function withRegistryService<R>(registry: R): TWithRegistryService<R> {
  return {
    getRegistry: (): R => registry
  };
}
