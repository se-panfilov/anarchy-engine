import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { WatcherType } from '@/Abstract/Constants';
import type { TAbstractWatcher } from '@/Abstract/Models';
import type { TDestroyable } from '@/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@/Mixins';
import { isDefined } from '@/Utils';

export function AbstractWatcher<T>(type: WatcherType | string, name: string, tags: ReadonlyArray<string> = []): TAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    enabled$.complete();
    value$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  const partialResult = Object.assign(destroyable, {
    id,
    name,
    type,
    tags,
    value$,
    enabled$
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TAbstractWatcher<T> = Object.assign(partialResult, withNameAndNameAccessorsMixin(partialResult));

  if (isDefined(name)) result.setName(name);

  return result;
}
