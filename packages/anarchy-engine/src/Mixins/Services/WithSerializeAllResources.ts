import type { TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TAbstractSerializeDependencies } from '@hellpig/anarchy-engine/Abstract';
import type { TWithSerializeAllResources } from '@hellpig/anarchy-engine/Mixins/Services/Models';

export function withSerializeAllResources<C extends TAbstractResourceConfig, D extends TAbstractSerializeDependencies<C>>(
  registry: TAbstractResourceAsyncRegistry<any>,
  dependencies: D
): TWithSerializeAllResources<C> {
  return {
    serializeAllResources: (): ReadonlyArray<C> => registry.serialize(dependencies)
  };
}
