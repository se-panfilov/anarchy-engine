import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { ReactiveWrapper, Factory } from '@Engine/Models';

export function AbstractFactory<T extends ReactiveWrapper<unknown>, R extends Record<string, any>>(
  create: (params: R) => T
): Factory<T, R> {
  const id: string = nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const add$: Subject<R> = new Subject<R>();
  const destroyed$: Subject<void> = new Subject<void>();

  add$.subscribe((val: R): void => latest$.next(create(val)));

  destroyed$.subscribe(() => {
    add$.complete();
    latest$.complete();
    destroyed$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get latest$(): Subject<T> {
      return latest$;
    },
    get add$(): Subject<R> {
      return add$;
    },
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
