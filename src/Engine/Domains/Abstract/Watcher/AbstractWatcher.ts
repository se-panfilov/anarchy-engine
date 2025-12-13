import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { WatcherType } from '@/Engine/Domains/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Domains/Abstract/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';

export function AbstractWatcher<T>(type: WatcherType | string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();

  const destroyable: IDestroyable = destroyableMixin();

  destroyable.destroyed$.subscribe((): void => {
    value$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get type(): WatcherType | string {
      return type;
    },
    get value$(): Subject<T> {
      return value$;
    },
    ...withTags(tags),
    ...destroyable
  };
}
