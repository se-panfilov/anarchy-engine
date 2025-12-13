import { nanoid } from 'nanoid';

import type { EntityType } from '@/Engine/Abstract';
import type { TEntity } from '@/Engine/Abstract/Models';
import type { TDestroyable, TRegistrable, TWithId, TWithNameAndNameAccessorsMixin, TWithNameOptional, TWithTagsMixin } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import type { TOptional } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

type TEntityParams = Readonly<{ tags?: ReadonlyArray<string> } & TWithNameOptional> & TOptional<TWithId>;

export function AbstractEntity<T extends Record<string, any>>(entities: T, type: EntityType | string, params?: TEntityParams): TEntity<T> {
  const id: string = isDefined(params?.id) ? params.id : type + '_' + nanoid();

  const withNameAndNameAccessors: TWithNameAndNameAccessorsMixin = withNameAndNameAccessorsMixin();
  const destroyable: TDestroyable = destroyableMixin();
  const withTags: TWithTagsMixin = withTagsMixin(params ? params.tags : []);

  const partialResult: T & TRegistrable & TWithTagsMixin & TDestroyable = {
    ...destroyable,
    ...withTags,
    id,
    ...entities
  };

  const result: TEntity<T> = { ...partialResult, ...withNameAndNameAccessors };

  if (isDefined(params?.name)) result.setName(params.name);

  return result;
}
