import { nanoid } from 'nanoid';

import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IWrapper } from '@/Engine/Domains/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  return {
    id: type + '_' + nanoid(),
    entity,
    isRegistrable: true,
    ...withTags(params ? params.tags : []),
    ...destroyableMixin()
  };
}
