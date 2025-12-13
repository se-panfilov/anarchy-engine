import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins/Generics/Models';

export function destroyableMixin(): TDestroyable {
  const destroyed$: Subject<void> = new Subject<void>();
  let isDestroyed: boolean = false;

  destroyed$.subscribe((): void => {
    isDestroyed = true;
    destroyed$.unsubscribe();
    destroyed$.complete();
  });

  return {
    destroy: (): void => destroyed$.next(),
    isDestroyed: (): boolean => isDestroyed,
    destroyed$: destroyed$.asObservable()
  };
}
