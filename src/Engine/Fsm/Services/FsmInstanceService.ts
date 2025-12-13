import type { Subscription } from 'rxjs';

import type { TFsmSource } from '@/Engine/Fsm';
import type { TFsmInstanceFactory, TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TFsmInstanceService } from '@/Engine/Fsm/Models/TFsmInstanceService';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function FsmInstanceService(factory: TFsmInstanceFactory, registry: TFsmInstanceRegistry): TFsmInstanceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmWrapper): void => registry.add(fsm));

  const create = (source: TFsmSource): TFsmWrapper => factory.create(source);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    getFactory: (): TFsmInstanceFactory => factory,
    getRegistry: (): TFsmInstanceRegistry => registry,
    ...destroyable
  };
}
