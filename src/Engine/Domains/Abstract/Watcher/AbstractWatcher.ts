import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { CommonTag, WatcherType } from '@/Engine/Domains/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Domains/Abstract/Models';

export function AbstractWatcher<T>(type: WatcherType | string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroy$: Subject<void> = new Subject<void>();

  destroy$.subscribe(() => {
    value$.complete();
    destroy$.unsubscribe();
    destroy$.complete();
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
    get destroy$(): Subject<void> {
      return destroy$;
    },
    get tags(): ReadonlyArray<CommonTag | string> {
      return tags;
    },
    get isRegistrable(): boolean {
      return true;
    }
  };
}
