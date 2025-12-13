import { nanoid } from 'nanoid';

import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IWrapper } from '@/Engine/Domains/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import { isDefined } from '@/Engine/Utils';

type entityWithName = { name?: string };

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();

  if (isDefined((entity as entityWithName).name)) {
    // TODO (S.Panfilov) log somehow
    if ((entity as entityWithName).name !== '' || typeof (entity as entityWithName).name !== 'string') console.warn('Entity name is not empty or not a string: ', (entity as entityWithName).name);
    // eslint-disable-next-line functional/immutable-data
    (entity as entityWithName).name = id;
  }

  return {
    id,
    entity,
    ...withTags(params ? params.tags : []),
    ...destroyableMixin()
  };
}
