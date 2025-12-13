import { Subject } from 'rxjs';

import type { IWithBuilt } from '@/Engine/Space/Models';

export function withBuiltMixin(): IWithBuilt {
  const built$: Subject<void> = new Subject<void>();
  let isBuilt: boolean = false;

  built$.subscribe((): void => {
    isBuilt = true;
    built$.complete();
  });

  return {
    build: (): void => built$.next(),
    isBuilt: (): boolean => isBuilt,
    built$
  };
}
