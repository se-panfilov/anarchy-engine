import type { TSerializable } from '@/Engine/Mixins/Generics/Models';
import type { TWithSerializeEntity } from '@/Engine/Mixins/Services/Models';

export function WithSerializeEntity<E extends TSerializable<any>, C extends Record<string, any>, D extends Record<string, any> | undefined = undefined>(
  entity: E,
  dependencies?: D
): TWithSerializeEntity<C, D> {
  return {
    serializeEntity: (): C => entity.serialize(dependencies as any)
  };
}
