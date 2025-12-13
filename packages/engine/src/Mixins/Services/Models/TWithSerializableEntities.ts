import type { TSerializable } from '@/Mixins';

export type TWithSerializableEntities<E extends TSerializable<any>, C extends Record<string, any>> = Readonly<{
  serializeAllEntities: () => ReadonlyArray<C>;
  serializeEntity: (entity: E) => C;
}>;
