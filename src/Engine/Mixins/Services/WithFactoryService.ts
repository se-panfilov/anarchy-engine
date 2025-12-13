import type { TWithFactoryService } from '@/Engine/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractHooks, TExtractParams } from '@/Engine/Mixins/Services/Utils';

export function withFactoryService<F extends { create: (...args: any[]) => any }>(factory: F): TWithFactoryService<TExtractEntity<F>, TExtractParams<F>, TExtractDeps<F>, any, TExtractHooks<F>> {
  return {
    getFactory: (): F => factory
  };
}
