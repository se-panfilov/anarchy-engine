import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Factory } from '../Models/Factory';
import type { Entity } from '@Engine/Models/Entity';

export function AbstractFactory<T extends Entity<unknown>, R extends Record<string, any>>(
  create: (params: R) => T
): Factory<T, R> {
  const id: string = nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const add$: Subject<R> = new Subject<R>();
  const destroyed$: Subject<void> = new Subject<void>();

  add$.subscribe((val: R): void => latest$.next(create(val)));

  function destroy(): void {
    latest$.complete();
    add$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

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
    destroy,
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
