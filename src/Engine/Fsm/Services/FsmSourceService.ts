import type { Subscription } from 'rxjs';

import type { TFsmConfig, TFsmParams, TFsmSource, TFsmSourceFactory, TFsmSourceRegistry, TFsmSourceService } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));

  const create = (params: TFsmParams): TFsmSource => factory.create(params);
  const createFromConfig = (fsm: ReadonlyArray<TFsmConfig>): ReadonlyArray<TFsmSource> => fsm.map((fsm: TFsmConfig): TFsmSource => create(factory.configToParams(fsm)));

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
    getFactory: (): TFsmSourceFactory => factory,
    getRegistry: (): TFsmSourceRegistry => registry,
    ...destroyable
  };
}
