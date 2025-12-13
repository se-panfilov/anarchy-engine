import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Entity } from '@Engine/Models/Entity';

export function AbstractWrapper<T>(entity: T): Entity<T> {
  const id: string = nanoid();
  const destroyed$ = new Subject<void>();

  destroyed$.subscribe(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entity = undefined as any;
  });

  function destroy(): void {
    destroyed$.next();
    destroyed$.unsubscribe();
    destroyed$.complete();
  }

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    destroy,
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
