import type { WatcherType } from '@Anarchy/Engine/Abstract/Constants';
import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract/Models';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin, withNameAndNameAccessorsMixin } from '@Anarchy/Engine/Mixins';
import { isDefined } from '@Anarchy/Shared/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

export function AbstractWatcher<T>(type: WatcherType | string, name: string, tags: ReadonlyArray<string> = []): TAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    enabled$.next(false);
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
