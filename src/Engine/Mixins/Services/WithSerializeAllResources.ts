import type { TAbstractResourceAsyncRegistry } from '@/Engine/Abstract';
import type { TWithSerializeAllResources } from '@/Engine/Mixins/Services/Models';

export function withSerializeAllResources<C extends Record<string, any>, D extends Record<string, any> | undefined>(
  registry: TAbstractResourceAsyncRegistry<any>,
  dependencies?: D
): TWithSerializeAllResources<C> {
  return {
    serializeAllResources: (): ReadonlyArray<C> => registry.serialize(dependencies) as ReadonlyArray<C>
  };
}
