import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

import type { EntityType } from '@/Engine/Abstract/Constants';
import type { TEntity, TEntityParams } from '@/Engine/Abstract/Models';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { genericEntityCleanUp, isDefined } from '@/Engine/Utils';

// TODO 13-0-0: Check destroy in registries
// TODO 13-0-0: Stop loops
// TODO 13-0-0: Build destroy chain Space -> Services -> registries -> entities -> sub-entities
// TODO 13-0-0: Test partial destroy of entities
// TODO 13-0-0: Implement whole scene destroy (reload the page or destroy the canvas or smth)
// TODO 13-0-0: Start implementing Multiple scenes support (14.x.x) (maybe with an url param?)

export function AbstractEntity<T extends Record<string, any>>(entities: T, type: EntityType | string, params?: TEntityParams): TEntity<T> {
  const id: string = isDefined(params?.id) ? params.id : type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    Object.values(entities).forEach(genericEntityCleanUp);

    destroySub$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  const partialResult: T & TRegistrable & TNoSpread & TDestroyable = {
    ...params,
    id,
    ...entities,
    tags: params?.tags ?? [],
    ...destroyable
  };

  // eslint-disable-next-line functional/immutable-data
  const result: TEntity<T> = Object.assign(partialResult, withNameAndNameAccessors);

  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
