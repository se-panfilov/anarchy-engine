import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Watcher } from '@Engine/Models';

export function AbstractWatcher<T>(type: string, start: () => void, stop: () => void): Watcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const start$: Subject<void> = new Subject<void>();
  const stop$: Subject<void> = new Subject<void>();
  const destroyed$: Subject<void> = new Subject<void>();

  start$.subscribe(start);
  stop$.subscribe(stop);

  destroyed$.subscribe(() => {
    start$.unsubscribe();
    start$.complete();
    stop$.unsubscribe();
    stop$.complete();
    value$.complete();
    destroyed$.unsubscribe();
    destroyed$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type;
    },
    get value$(): Subject<T> {
      return value$;
    },
    get start$(): Subject<void> {
      return start$;
    },
    get stop$(): Subject<void> {
      return stop$;
    },
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
