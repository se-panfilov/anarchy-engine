import type { TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TAbstractSerializeDependencies } from '@Anarchy/Engine/Abstract';
import type { TWithSerializeAllResources } from '@Anarchy/Engine/Mixins/Services/Models';

export function withSerializeAllResources<C extends TAbstractResourceConfig, D extends TAbstractSerializeDependencies<C>>(
  registry: TAbstractResourceAsyncRegistry<any>,
  dependencies: D
): TWithSerializeAllResources<C> {
  return {
    serializeAllResources: (): ReadonlyArray<C> => registry.serialize(dependencies)
  };
}
