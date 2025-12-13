import { Subject } from 'rxjs';

import type { IWithBuilt } from '@/Engine/Domains/Level/Models';

export function withBuiltMixin(): IWithBuilt {
  const built$: Subject<void> = new Subject<void>();
  let isBuilt: boolean = false;

  built$.subscribe((): void => {
    isBuilt = true;
    built$.unsubscribe();
    built$.complete();
  });

  return {
    build: (): void => built$.next(),
    isBuilt: (): boolean => isBuilt,
    built$
  };
}
