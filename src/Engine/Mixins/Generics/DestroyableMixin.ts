import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins/Generics/Models';

export function destroyableMixin(): TDestroyable {
  const destroy$: Subject<void> = new Subject<void>();
  let isDestroyed: boolean = false;

  destroy$.subscribe((): void => {
    isDestroyed = true;
    destroy$.complete();
    destroy$.unsubscribe();
  });

  return {
    isDestroyed: (): boolean => isDestroyed,
    destroy$
  };
}
