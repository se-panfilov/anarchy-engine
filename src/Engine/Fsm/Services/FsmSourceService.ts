import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmParams, TFsmSource, TFsmSourceFactory, TFsmSourceRegistry, TFsmSourceService } from '@/Engine/Fsm/Models';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const abstractService: TAbstractService = AbstractService();
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));

  const create = (params: TFsmParams): TFsmSource => factory.create(params);
  const createFromConfig = (fsm: ReadonlyArray<TFsmConfig>): ReadonlyArray<TFsmSource> => fsm.map((fsm: TFsmConfig): TFsmSource => create(factory.configToParams(fsm)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TFsmSourceFactory => factory,
    getRegistry: (): TFsmSourceRegistry => registry
  });
}
