import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { ReactiveWrapper } from '@Engine/Models';

export function AbstractWrapper<T>(entity: T): ReactiveWrapper<T> {
  const id: string = nanoid();
  const destroy$ = new Subject<void>();

  destroy$.subscribe(() => {
    destroy$.unsubscribe();
    destroy$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    get destroy$(): Subject<void> {
      return destroy$;
    }
  };
}
