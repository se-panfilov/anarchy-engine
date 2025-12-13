import type { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs';

import type { IDestroyable } from '@/Engine/Domains/Mixins/Generic/Models';

export function withDestroyedMixin(destroyed$: BehaviorSubject<boolean>): Omit<IDestroyable, 'destroy'> {
  return {
    isDestroyed: (): boolean => destroyed$.getValue(),
    get destroyed$(): Observable<void> {
      return destroyed$.pipe(
        filter((v: boolean): boolean => !!v),
        map(() => undefined),
        tap((v: undefined) => console.log('destroyed', v))
      );
    }
  };
}
