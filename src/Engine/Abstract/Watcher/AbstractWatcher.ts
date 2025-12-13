import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Abstract/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generic';

export function AbstractWatcher<T>(type: WatcherType | string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroyable: IDestroyable = destroyableMixin();

  destroyable.destroyed$.subscribe((): void => value$.complete());

  return {
    id,
    type,
    value$,
    ...withTagsMixin(tags),
    ...destroyable
  };
}
