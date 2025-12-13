import { nanoid } from 'nanoid';
import { BehaviorSubject, Subject } from 'rxjs';

import type { CommonTag, WatcherType } from '@/Engine/Domains/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Domains/Abstract/Models';

export function AbstractWatcher<T>(type: WatcherType | string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  destroyed$.subscribe(() => {
    value$.complete();
    destroyed$.unsubscribe();
    destroyed$.complete();
  });

  function destroy(): void {
    destroyed$.next(true);
  }

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
    destroy,
    get destroyed$(): BehaviorSubject<boolean> {
      return destroyed$;
    },
    get tags(): ReadonlyArray<CommonTag | string> {
      return tags;
    },
    get isRegistrable(): boolean {
      return true;
    }
  };
}
