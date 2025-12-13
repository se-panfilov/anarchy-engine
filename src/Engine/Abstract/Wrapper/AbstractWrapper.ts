import { nanoid } from 'nanoid';

import type { IWithUserData, IWithWrapperId, IWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@/Engine/Abstract';
import type { IWrapper } from '@/Engine/Abstract/Models';
import type { IDestroyable, IRegistrable, IWithEntity, IWithName, IWithNameAndNameAccessorsMixin, IWithTagsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generic';
import { isDefined, isWithUserData, isWithWrapperIdAccessors } from '@/Engine/Utils';

type IWrapperParams = Readonly<{ tags?: ReadonlyArray<string> } & IWithName>;

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<T>;
export function AbstractWrapper<T extends IWithUserData>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<IWithWrapperIdEntity<T>>;
export function AbstractWrapper<T extends IWithUserData>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<IWithWrapperIdEntity<any>> | IWrapper<T> {
  const id: string = type + '_' + nanoid();

  const withNameAndNameAccessors: IWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const withWrapperId: IWithWrapperId = isWithUserData(entity) ? withWrapperIdMixin(entity) : withNoWrapperIdMixin(entity);
  const destroyable: IDestroyable = destroyableMixin();
  const withTags: IWithTagsMixin = withTagsMixin(params ? params.tags : []);

  const partialResult: IWithEntity<T> & IRegistrable & IWithTagsMixin & IDestroyable = {
    id,
    entity,
    ...withTags,
    ...destroyable
  };

  const result: IWrapper<T> = { ...partialResult, ...withWrapperId, ...withNameAndNameAccessors };

  //apply params
  if (isWithUserData(entity) && isWithWrapperIdAccessors(result)) result.setWrapperId(id);
  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
