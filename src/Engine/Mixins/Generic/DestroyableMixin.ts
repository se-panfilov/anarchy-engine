import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import type { IDestroyable } from '@/Engine/Mixins/Generic/Models';

export function destroyableMixin(): IDestroyable {
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
    get destroyed$(): Observable<void> {
      return destroyed$.asObservable();
    }
  };
}
