import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins/Generics/Models';

export function destroyableMixin(): TDestroyable {
  const destroy$: Subject<void> = new Subject<void>();

  destroy$.subscribe((): void => {
    destroy$.complete();
    destroy$.unsubscribe();
  });

  return {
    destroy$
  };
}
