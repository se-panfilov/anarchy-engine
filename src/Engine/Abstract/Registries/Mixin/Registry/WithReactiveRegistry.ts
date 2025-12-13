import { Subject } from 'rxjs';

import type { TRegistryPack, TWithReactiveRegistry } from '@/Engine/Abstract/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { isDestroyable } from '@/Engine/Utils';

export function withReactiveRegistry<T>(destroyable: TDestroyable): TWithReactiveRegistry<T> {
  const registry: Map<string, T> = new Map();
  const added$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();
  const replaced$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();
  const removed$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();

  destroyable.destroy$.subscribe((): void => {
    added$.complete();
    replaced$.complete();
    removed$.complete();
    registry.forEach((obj: T): void => {
      if (isDestroyable(obj)) obj.destroy$.next();
    });
    registry.clear();
  });

  return {
    added$,
    replaced$,
    removed$
  };
}
