import { Subject } from 'rxjs';

import type { IWithReactiveRegistry } from '@/Engine/Abstract/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { isDestroyable } from '@/Engine/Utils';

export function withReactiveRegistry<T>(destroyable: IDestroyable): IWithReactiveRegistry<T> {
  const registry: Map<string, T> = new Map();
  const added$: Subject<T> = new Subject<T>();
  const replaced$: Subject<T> = new Subject<T>();
  const removed$: Subject<T> = new Subject<T>();

  destroyable.destroyed$.subscribe((): void => {
    added$.complete();
    replaced$.complete();
    removed$.complete();
    registry.forEach((obj: T): void => {
      if (isDestroyable(obj)) obj.destroy();
    });
    registry.clear();
  });

  return {
    added$,
    replaced$,
    removed$
  };
}
