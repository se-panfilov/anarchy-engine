import type { WrapperType } from '@Anarchy/Engine/Abstract/Constants';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@Anarchy/Engine/Abstract/Mixins';
import type { TAbstractWrapper, TWithUserData, TWithWrapperId, TWithWrapperIdEntity } from '@Anarchy/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithEntity, TWithName } from '@Anarchy/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@Anarchy/Engine/Mixins';
import type { TWithTags } from '@Anarchy/Engine/Mixins/Generics/Models/TWithTags';
import { genericEntityCleanUp, isWithUserData, isWithWrapperIdAccessors, mergeAll } from '@Anarchy/Engine/Utils';
import { isDefined } from '@Anarchy/Shared/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

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
