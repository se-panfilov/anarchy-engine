import type { TAbstractEntityRegistry, TAbstractSimpleRegistry } from '@/Engine/Abstract';
import type { TWithSerializeAllEntities } from '@/Engine/Mixins/Services/Models';

export function withSerializeAllEntities<C extends Record<string, any>, D extends Record<string, any> | undefined>(
  registry: TAbstractSimpleRegistry<any> | TAbstractEntityRegistry<any>,
  dependencies?: D
): TWithSerializeAllEntities<C> {
  return {
    serializeAllEntities: (): ReadonlyArray<C> => registry.serialize(dependencies) as ReadonlyArray<C>
  };
}
