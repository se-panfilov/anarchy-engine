import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { IAbstractWatcher } from '../Models';

export function AbstractWatcher<T>(type: string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_watcher_' + nanoid();
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
    get type(): string {
      return type + 'watcher';
    },
    get value$(): Subject<T> {
      return value$;
    },
    get destroy$(): Subject<void> {
      return destroy$;
    },
    get tags(): ReadonlyArray<string> {
      return tags;
    },
    get isRegistrable(): boolean {
      return true;
    }
  };
}
