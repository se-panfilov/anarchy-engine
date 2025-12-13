import { nanoid } from 'nanoid';

import type { WrapperType } from '@/Engine/Domains/Abstract';
import { destroyableMixin } from '@/Engine/Domains/Mixins';

import type { IWrapper } from '../Models';

export function AbstractWrapper<T>(entity: T, type: string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();

  const wrapper: IWrapper<T> = {} as IWrapper<T>;

  return {
    ...wrapper,
    get id(): string {
      return id;
    },
    get type(): WrapperType | string {
      return type;
    },
    entity,
    tags: params?.tags ?? [],
    isRegistrable: true,
    ...destroyableMixin(wrapper)
  };
}
