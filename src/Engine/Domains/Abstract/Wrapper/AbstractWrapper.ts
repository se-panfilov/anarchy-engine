import { nanoid } from 'nanoid';

import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IWrapper } from '@/Engine/Domains/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  return {
    id: type + '_' + nanoid(),
    type,
    entity,
    tags: params?.tags ?? [],
    isRegistrable: true,
    ...destroyableMixin()
  };
}
