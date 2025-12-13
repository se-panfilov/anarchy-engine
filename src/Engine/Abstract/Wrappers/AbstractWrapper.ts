import { nanoid } from 'nanoid';

import type { TWithUserData, TWithWrapperId, TWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@/Engine/Abstract';
import type { TWrapper } from '@/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithNameOptional, TWithTagsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { isDefined, isWithUserData, isWithWrapperIdAccessors } from '@/Engine/Utils';

type TWrapperParams = Readonly<{ tags?: ReadonlyArray<string> } & TWithNameOptional>;

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<T>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<TWithWrapperIdEntity<T>>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<TWithWrapperIdEntity<any>> | TWrapper<T> {
  const id: string = type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const withWrapperId: TWithWrapperId = isWithUserData(entity) ? withWrapperIdMixin(entity) : withNoWrapperIdMixin(entity);
  const destroyable: TDestroyable = destroyableMixin();
  const withTags: TWithTagsMixin = withTagsMixin(params ? params.tags : []);

  const partialResult: TWithEntity<T> & TRegistrable & TWithTagsMixin & TDestroyable = {
    id,
    entity,
    ...withTags,
    ...destroyable
  };

  const result: TWrapper<T> = { ...partialResult, ...withWrapperId, ...withNameAndNameAccessors };

  //apply params
  if (isWithUserData(entity) && isWithWrapperIdAccessors(result)) result.setWrapperId(id);
  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
