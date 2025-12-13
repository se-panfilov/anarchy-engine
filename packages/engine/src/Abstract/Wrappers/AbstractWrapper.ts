import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

import type { TAbstractWrapper, TWithUserData, TWithWrapperId, TWithWrapperIdEntity, WrapperType } from '@/Abstract';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@/Abstract';
import type { TDestroyable, TRegistrable, TWithEntity, TWithName } from '@/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Mixins';
import type { TWithTags } from '@/Mixins/Generics/Models/TWithTags';
import { genericEntityCleanUp, isDefined, isWithUserData, isWithWrapperIdAccessors, mergeAll } from '@/Utils';

type TWrapperParams = TWithTags & TWithName;

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: TWrapperParams): TAbstractWrapper<T>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TAbstractWrapper<TWithWrapperIdEntity<T>>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TAbstractWrapper<TWithWrapperIdEntity<any>> | TAbstractWrapper<T> {
  const id: string = type + '_' + nanoid();

  const withWrapperId: TWithWrapperId = isWithUserData(entity) ? withWrapperIdMixin(entity) : withNoWrapperIdMixin(entity);
  const destroyable: TDestroyable = destroyableMixin();

  const partialResult: TWithEntity<T> & TRegistrable & TWithName = {
    id,
    entity,
    name: (entity as unknown as TWithName).name ?? params?.name,
    tags: params?.tags ?? []
  };

  const result: TAbstractWrapper<T> = mergeAll(partialResult, withWrapperId, destroyable, withNameAndNameAccessorsMixin(partialResult));

  const destroyableSub$: Subscription = destroyable.destroy$.subscribe((): void => {
    genericEntityCleanUp(entity);

    destroyableSub$.unsubscribe();
  });

  //apply params
  if (isWithUserData(entity) && isWithWrapperIdAccessors(result)) result.setWrapperId(id);
  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
