import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Entity } from '@Engine/Models/Entity';

export function AbstractWrapper<T>(entity: T): Entity<T> {
  let id: string = nanoid();
  let destroyed$ = new Subject<void>();

  destroyed$.subscribe(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entity = undefined as any;
  });

  function destroy(): void {
    destroyed$.next();
    destroyed$.unsubscribe();
    destroyed$.complete();
  }

  return { id, entity, destroy, destroyed$ };
}
