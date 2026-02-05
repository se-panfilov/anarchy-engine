import type { TAbstractEntityRegistry, TAbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract';
import type { TSerializable } from '@hellpig/anarchy-engine/Mixins/Generics/Models';
import type { TWithSerializableEntities } from '@hellpig/anarchy-engine/Mixins/Services/Models';

export function withSerializableEntities<E extends TSerializable<any>, C extends Record<string, any>, D extends Record<string, any> | undefined = undefined>(
  registry: TAbstractSimpleRegistry<any> | TAbstractEntityRegistry<any>,
  dependencies?: D
): TWithSerializableEntities<E, C> {
  return {
    serializeAllEntities: (): ReadonlyArray<C> => registry.serialize(dependencies) as ReadonlyArray<C>,
    serializeEntity: (entity: E): C => entity.serialize(dependencies as any)
  };
}
