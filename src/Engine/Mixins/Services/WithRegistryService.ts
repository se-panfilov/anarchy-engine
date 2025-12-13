import type { TWithRegistryService } from '@/Engine/Mixins/Services/Models';

export function withRegistryService<R>(registry: R): TWithRegistryService<R> {
  return {
    getRegistry: (): R => registry
  };
}
