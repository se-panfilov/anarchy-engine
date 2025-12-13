import { nanoid } from 'nanoid';

import type { IAbstractEntityWithWrapperId, WrapperType } from '@/Engine/Abstract';
import { withWrapperId } from '@/Engine/Abstract';
import type { IWrapper } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();

  const result = {
    id,
    entity,
    ...withTags(params ? params.tags : []),
    ...withWrapperId(entity as IAbstractEntityWithWrapperId),
    ...destroyableMixin()
  };

  result.setWrapperId(id);

  return result;
}
