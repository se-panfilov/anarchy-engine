import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

import type { TWithUserData, TWithWrapperId, TWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@/Engine/Abstract';
import type { TWrapper } from '@/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithNameOptional } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import type { TWithTags } from '@/Engine/Mixins/Generics/Models/TWithTags';
import type { TWithModel3d } from '@/Engine/Models3d';
import { destroyGeometryInEntity, destroyMaterialInEntity, destroyTransformDriveInEntity, isDefined, isWithUserData, isWithWrapperIdAccessors, removeFromParent, stopParenting } from '@/Engine/Utils';

type TWrapperParams = TWithTags & TWithNameOptional;

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<T>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<TWithWrapperIdEntity<T>>;
export function AbstractWrapper<T extends TWithUserData>(entity: T, type: WrapperType | string, params?: TWrapperParams): TWrapper<TWithWrapperIdEntity<any>> | TWrapper<T> {
  const id: string = type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const withWrapperId: TWithWrapperId = isWithUserData(entity) ? withWrapperIdMixin(entity) : withNoWrapperIdMixin(entity);
  const destroyable: TDestroyable = destroyableMixin();

  const partialResult: TWithEntity<T> & TRegistrable & TDestroyable = {
    ...params,
    id,
    entity,
    tags: params?.tags ?? [],
    ...destroyable
  };

  // eslint-disable-next-line functional/immutable-data
  const result: TWrapper<T> = Object.assign(partialResult, withWrapperId, withNameAndNameAccessors);

  const destroyableSub$: Subscription = destroyable.destroy$.subscribe((): void => {
    removeFromParent(entity);
    stopParenting(entity);

    destroyTransformDriveInEntity(entity);

    // mixer.stopAllAction() + dispose()

    if (isDefined((entity as unknown as TWithModel3d).model3d)) (entity as unknown as TWithModel3d).model3d.destroy$.next();

    // Destroy Threejs fields and resources
    destroyGeometryInEntity(entity);
    destroyMaterialInEntity(entity);

    // Remove children if exists
    (entity as any).clear?.();

    // Dispose the entity itself
    (entity as any).dispose?.();

    destroyableSub$.unsubscribe();

    result.destroy$.next();
    result.destroy$.complete();
    result.destroy$.unsubscribe();
  });

  //apply params
  if (isWithUserData(entity) && isWithWrapperIdAccessors(result)) result.setWrapperId(id);
  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
