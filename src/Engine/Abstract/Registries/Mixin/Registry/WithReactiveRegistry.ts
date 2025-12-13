import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TRegistryPack, TWithReactiveRegistry } from '@/Engine/Abstract/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { isDestroyable } from '@/Engine/Utils';

export function withReactiveRegistry<T>(registry: Map<string, T>, destroyable: TDestroyable): TWithReactiveRegistry<T> {
  const added$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();
  const replaced$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();
  const removed$: Subject<TRegistryPack<T>> = new Subject<TRegistryPack<T>>();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

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
