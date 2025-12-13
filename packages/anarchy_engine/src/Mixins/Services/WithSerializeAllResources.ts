import type { TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TAbstractSerializeDependencies } from '@Engine/Abstract';
import type { TWithSerializeAllResources } from '@Engine/Mixins/Services/Models';

export function withSerializeAllResources<C extends TAbstractResourceConfig, D extends TAbstractSerializeDependencies<C>>(
  registry: TAbstractResourceAsyncRegistry<any>,
  dependencies: D
): TWithSerializeAllResources<C> {
  return {
    serializeAllResources: (): ReadonlyArray<C> => registry.serialize(dependencies)
  };
}
