import { nanoid } from 'nanoid';

import type { EntityType } from '@/Engine/Abstract';
import type { TEntity } from '@/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithName, TWithNameAndNameAccessorsMixin, TWithTagsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { isDefined } from '@/Engine/Utils';

type TEntityParams = Readonly<{ tags?: ReadonlyArray<string> } & TWithName>;

export function AbstractEntity<T extends Record<string, any>>(entities: T, type: EntityType | string, params?: TEntityParams): TEntity<T> {
  const id: string = type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const destroyable: TDestroyable = destroyableMixin();
  const withTags: TWithTagsMixin = withTagsMixin(params ? params.tags : []);

  const partialResult: T & TRegistrable & TWithTagsMixin & TDestroyable = {
    id,
    ...entities,
    ...withTags,
    ...destroyable
  };

  const result: TEntity<T> = { ...partialResult, ...withNameAndNameAccessors };

  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
