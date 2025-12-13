import { nanoid } from 'nanoid';
import type { Object3D } from 'three';

import type { TWithUserData, TWithWrapperId, TWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withNoWrapperIdMixin, withWrapperIdMixin } from '@/Engine/Abstract';
import type { TWrapper } from '@/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithNameOptional } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import type { TWithTags } from '@/Engine/Mixins/Generics/Models/TWithTags';
import { isDefined, isWithUserData, isWithWrapperIdAccessors } from '@/Engine/Utils';

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

  const destroyableSub$ = destroyable.destroy$.subscribe((): void => {
    destroyableSub$.unsubscribe();

    result.destroy$.next();
    result.destroy$.complete();

    if (isDefined((entity as any).traverse)) {
      (entity as any).traverse((child: Object3D<any>): void => void child.parent?.remove(child));
    }

    (entity as any).dispose?.();
    (entity as any).clear?.();
  });

  //apply params
  if (isWithUserData(entity) && isWithWrapperIdAccessors(result)) result.setWrapperId(id);
  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
