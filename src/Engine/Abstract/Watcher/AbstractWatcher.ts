import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Abstract/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generic';
import { isDefined } from '@/Engine/Utils';

export function AbstractWatcher<T>(type: WatcherType | string, name: string | undefined, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroyable: IDestroyable = destroyableMixin();

  destroyable.destroyed$.subscribe((): void => value$.complete());

  const result = {
    id,
    name,
    type,
    value$,
    ...withNameAndNameAccessorsMixin(),
    ...withTagsMixin(tags),
    ...destroyable
  };

  if (isDefined(name)) result.setName(name);

  return result;
}
