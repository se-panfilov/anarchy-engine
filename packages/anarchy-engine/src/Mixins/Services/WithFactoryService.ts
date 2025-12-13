import type { TWithFactoryService } from '@Anarchy/Engine/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractParams } from '@Anarchy/Engine/Mixins/Services/Utils';

export function withFactoryService<F extends { create: (...args: any[]) => any }>(factory: F): TWithFactoryService<TExtractEntity<F>, TExtractParams<F>, TExtractDeps<F>, any> {
  return {
    getFactory: (): F => factory
  };
}
