import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { TAbstractWatcher } from '@/Engine/Abstract/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { isDefined } from '@/Engine/Utils';

export function AbstractWatcher<T>(type: WatcherType | string, name: string | undefined, tags: ReadonlyArray<string> = []): TAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroyable: TDestroyable = destroyableMixin();

  destroyable.destroy$.subscribe((): void => value$.complete());

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
