import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

import type { EntityType } from '@/Engine/Abstract/Constants';
import type { TAbstractEntity, TEntityParams } from '@/Engine/Abstract/Models';
import type { TDestroyable, TNoSpread, TRegistrable, TWithName } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { genericEntityCleanUp, isDefined, mergeAll } from '@/Engine/Utils';

// TODO 14-0-0: Make sure we are destroying Intersections
export function AbstractEntity<T extends Record<string, any>, P extends TEntityParams>(entities: T, type: EntityType | string, params?: P): TAbstractEntity<T> {
  const id: string = isDefined(params?.id) ? params.id : type + '_' + nanoid();

  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    Object.values(entities).forEach(genericEntityCleanUp);
    destroySub$.unsubscribe();
  });

  const partialResult: T & TRegistrable & TNoSpread & TWithName = Object.assign({
    ...params,
    id,
    ...entities,
    tags: params?.tags ?? []
  });

  const result: TAbstractEntity<T> = mergeAll(partialResult, destroyable, withNameAndNameAccessorsMixin(partialResult));

  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
