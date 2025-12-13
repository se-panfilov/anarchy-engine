import { nanoid } from 'nanoid';

import { destroyableMixin } from '@/Engine/Domains/Mixins';

import type { IWrapper } from '../Models';

export function AbstractWrapper<T>(entity: T, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = nanoid();

  const wrapper: IWrapper<T> = {} as IWrapper<T>;

  return {
    ...wrapper,
    id,
    entity,
    tags: params?.tags ?? [],
    isRegistrable: true,
    ...destroyableMixin(wrapper)
  };
}
