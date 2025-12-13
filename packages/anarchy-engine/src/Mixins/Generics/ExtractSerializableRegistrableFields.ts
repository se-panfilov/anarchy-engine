import type { TRegistrable } from '@Anarchy/Engine/Mixins/Generics/Models';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isDefined } from '@Anarchy/Shared/Utils';
import { isEmpty } from 'lodash-es';

export const extractSerializableRegistrableFields = <T extends TRegistrable>({ name, tags }: T): Omit<TRegistrable, 'id'> => {
  const result: TWriteable<Omit<TRegistrable, 'id'>> = { name };
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(tags) && !isEmpty(tags)) result.tags = tags;
  return result;
};
export const extractRegistrableFields = <T extends TRegistrable>({ name, id, tags }: T): TRegistrable => ({ name, tags, id });
