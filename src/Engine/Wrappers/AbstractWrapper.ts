import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { ReactiveWrapper } from '@Engine/Models';

export function AbstractWrapper<T>(entity: T): ReactiveWrapper<T> {
  const id: string = nanoid();
  const destroyed$ = new Subject<void>();

  destroyed$.subscribe(() => {
    destroyed$.unsubscribe();
    destroyed$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
