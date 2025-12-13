import { isEmpty } from 'lodash-es';

import type { TRegistrable } from '@/Engine/Mixins/Generics/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export const extractSerializableRegistrableFields = <T extends TRegistrable>({ name, tags }: T): Omit<TRegistrable, 'id'> => {
  const result: TWriteable<Omit<TRegistrable, 'id'>> = { name };
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(tags) && !isEmpty(tags)) result.tags = tags;
  return result;
};
export const extractRegistrableFields = <T extends TRegistrable>({ name, id, tags }: T): TRegistrable => ({ name, tags, id });
