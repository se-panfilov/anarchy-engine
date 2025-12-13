import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

import type { EntityType } from '@/Engine/Abstract/Constants';
import type { TEntity, TEntityParams } from '@/Engine/Abstract/Models';
import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { genericEntityCleanUp, isDefined } from '@/Engine/Utils';

// TODO 14-0-0: Implement whole scene destroy (reload the page or destroy the canvas or smth)
// TODO 14-0-0: Validate canvasSelector strings (only allowed characters)
// TODO 14-0-0: When destroying the space (canvas), make sure to unsubscribe all Observables and event listeners
// TODO 14-0-0: Check destroy with Text
// TODO 14-0-0: Check destroy with Physics
// TODO 14-0-0: Check destroy with Collisions
// TODO 14-0-0: Check destroy with FSM

export function AbstractEntity<T extends Record<string, any>, P extends TEntityParams>(entities: T, type: EntityType | string, params?: P): TEntity<T> {
  const id: string = isDefined(params?.id) ? params.id : type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    Object.values(entities).forEach(genericEntityCleanUp);
    destroySub$.unsubscribe();
  });

  const partialResult: T & TRegistrable & TNoSpread & TDestroyable = Object.assign(
    {
      ...params,
      id,
      ...entities,
      tags: params?.tags ?? []
    },
    destroyable
  );

  // eslint-disable-next-line functional/immutable-data
  const result: TEntity<T> = Object.assign(partialResult, withNameAndNameAccessors);

  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
