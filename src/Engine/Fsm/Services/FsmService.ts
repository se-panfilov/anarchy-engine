import type { Subscription } from 'rxjs';

import type { TFsmConfig, TFsmParams } from '@/Engine/Fsm';
import type { TFsmFactory, TFsmRegistry, TFsmService, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function FsmService(factory: TFsmFactory, registry: TFsmRegistry): TFsmService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((Fsm: TFsmWrapper): void => registry.add(Fsm));

  const create = (params: TFsmParams): TFsmWrapper => factory.create(params);
  const createFromConfig = (Fsm: ReadonlyArray<TFsmConfig>): ReadonlyArray<TFsmWrapper> => Fsm.map((Fsm: TFsmConfig): TFsmWrapper => create(factory.configToParams(Fsm)));

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TFsmFactory => factory,
    getRegistry: (): TFsmRegistry => registry,
    ...destroyable
  };
}
