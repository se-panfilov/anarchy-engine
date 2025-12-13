import type { TSerializable } from '@/Engine/Mixins/Generics/Models';

export type TWithSerializeEntity<E extends TSerializable<any, any>, C extends Record<string, any>> = Readonly<{
  serializeEntity: (entity: E) => C;
}>;
