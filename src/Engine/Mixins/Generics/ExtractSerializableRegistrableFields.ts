import type { TRegistrable } from '@/Engine/Mixins/Generics/Models';

export const extractSerializableRegistrableFields = <T extends TRegistrable>({ name, tags }: T): Omit<TRegistrable, 'id'> => ({ name, tags });
// export const extractRegistrableFields = <T extends TRegistrable>({ name, id, tags }: T): TRegistrable => ({ name, tags, id });
