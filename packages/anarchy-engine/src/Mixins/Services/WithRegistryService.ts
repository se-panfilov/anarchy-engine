import type { TWithRegistryService } from '@Anarchy/Engine/Mixins/Services/Models';

export function withRegistryService<R>(registry: R): TWithRegistryService<R> {
  return {
    getRegistry: (): R => registry
  };
}
