import type { TWithRegistryService } from '@/Mixins/Services/Models';

export function withRegistryService<R>(registry: R): TWithRegistryService<R> {
  return {
    getRegistry: (): R => registry
  };
}
