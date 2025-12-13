import { nanoid } from 'nanoid';

import type { IWithUserData, IWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withWrapperId } from '@/Engine/Abstract';
import type { IWrapper } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import { isWithUserData, IWithWrapperIdAccessors } from '@/Engine/Utils';

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T>;
export function AbstractWrapper<T extends IWithUserData>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<IWithWrapperIdEntity<T>>;
export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<IWithWrapperIdEntity<any>> | IWrapper<T> {
  const id: string = type + '_' + nanoid();

  let result = {
    id,
    entity,
    ...withTags(params ? params.tags : []),

    ...destroyableMixin()
  };

  if (isWithUserData(entity)) {
    result = { ...result, ...withWrapperId(entity) };

    if (IWithWrapperIdAccessors(result)) {
      result.setWrapperId(id);
      return result;
    }
  }

  return result as IWrapper<T>;
}
