import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmParams, TFsmSource, TFsmSourceFactory, TFsmSourceRegistry, TFsmSourceService } from '@/Engine/Fsm/Models';
import type { TDisposable } from '@/Engine/Mixins';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TFsmParams): TFsmSource => factory.create(params);
  const createFromConfig = (fsm: ReadonlyArray<TFsmConfig>): ReadonlyArray<TFsmSource> => fsm.map((fsm: TFsmConfig): TFsmSource => create(factory.configToParams(fsm)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TFsmSourceFactory => factory,
    getRegistry: (): TFsmSourceRegistry => registry
  });
}
