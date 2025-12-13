import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';

import type { CommonTag, WatcherType } from '@/Engine/Domains/Abstract/Constants';
import type { IAbstractWatcher } from '@/Engine/Domains/Abstract/Models';

export function AbstractWatcher<T>(type: WatcherType | string, tags: ReadonlyArray<string> = []): IAbstractWatcher<T> {
  const id: string = type + '_' + nanoid();
  const value$: Subject<T> = new Subject<T>();
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  function destroy(): void {
    value$.complete();
    destroyed$.complete();
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
    get tags(): ReadonlyArray<CommonTag | string> {
      return tags;
    },
    get isRegistrable(): boolean {
      return true;
    },
    destroy,
    isDestroyed: (): boolean => destroyed$.getValue(),
    get destroyed$(): Observable<void> {
      return destroyed$.pipe(
        filter((v: boolean): boolean => !!v),
        map(() => undefined)
      );
    }
  };
}
