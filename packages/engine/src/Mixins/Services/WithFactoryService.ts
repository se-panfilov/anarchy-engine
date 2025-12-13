import type { TWithFactoryService } from '@/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractParams } from '@/Mixins/Services/Utils';

export function withFactoryService<F extends { create: (...args: any[]) => any }>(factory: F): TWithFactoryService<TExtractEntity<F>, TExtractParams<F>, TExtractDeps<F>, any> {
  return {
    getFactory: (): F => factory
  };
}
