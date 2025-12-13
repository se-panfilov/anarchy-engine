import type { TRegistrable } from '@/Engine/Mixins/Generics/Models';

export const extractRegistrableFields = <T extends TRegistrable>({ name, id, tags }: T): TRegistrable => ({ name, tags, id });
