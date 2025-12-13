import { Subject } from 'rxjs';

import type { TWithBuilt } from '@/Engine/Space/Models';

export function withBuiltMixin(): TWithBuilt {
  const built$: Subject<void> = new Subject<void>();
  let isBuilt: boolean = false;

  built$.subscribe((): void => {
    isBuilt = true;
    built$.complete();
    built$.unsubscribe();
  });

  return {
    build: (): void => built$.next(),
    isBuilt: (): boolean => isBuilt,
    built$
  };
}
