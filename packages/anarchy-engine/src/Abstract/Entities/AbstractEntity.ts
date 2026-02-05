import type { EntityType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TAbstractEntity, TEntityParams } from '@hellpig/anarchy-engine/Abstract/Models';
import type { TDestroyable, TNoSpread, TRegistrable, TWithName } from '@hellpig/anarchy-engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@hellpig/anarchy-engine/Mixins';
import { genericEntityCleanUp, mergeAll } from '@hellpig/anarchy-engine/Utils';
import { isDefined, isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';

export function AbstractEntity<T extends Record<string, any>, P extends TEntityParams>(entities: T, type: EntityType | string, params: P): TAbstractEntity<T> {
  const id: string = isDefined(params.id) ? params.id : type + '_' + nanoid();

  if (isNotDefined(params.name)) throw new TypeError('Expected entity named "' + id + '"');

  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    Object.values(entities).forEach(genericEntityCleanUp);
    destroySub$.unsubscribe();
  });

  const partialResult: T & TRegistrable & TNoSpread & TWithName & TDestroyable = Object.assign(
    {
      ...params,
      id,
      ...entities,
      tags: params.tags ?? []
    },
    destroyable
  );

  const result = mergeAll(partialResult, destroyable, withNameAndNameAccessorsMixin(partialResult));

  if (isDefined(params.name)) result.setName(params.name);

  return result;
}
