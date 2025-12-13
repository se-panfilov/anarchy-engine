import type { TSerializable } from '@/Engine/Mixins/Generics/Models';
import type { TWithSerializeEntity } from '@/Engine/Mixins/Services/Models';

export function withSerializeEntity<E extends TSerializable<any>, C extends Record<string, any>, D extends Record<string, any> | undefined = undefined>(dependencies?: D): TWithSerializeEntity<E, C> {
  return {
    serializeEntity: (entity: E): C => entity.serialize(dependencies as any)
  };
}
