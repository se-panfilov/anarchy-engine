import type { EntityType } from '@Anarchy/Engine/Abstract/Constants';
import type { TAbstractEntity, TEntityParams } from '@Anarchy/Engine/Abstract/Models';
import type { TDestroyable, TNoSpread, TRegistrable, TWithName } from '@Anarchy/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@Anarchy/Engine/Mixins';
import { genericEntityCleanUp, mergeAll } from '@Anarchy/Engine/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
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
