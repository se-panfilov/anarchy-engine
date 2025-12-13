import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFsmSource } from '@/Engine/Fsm';
import type { TFsmInstanceFactory, TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TFsmInstanceService } from '@/Engine/Fsm/Models/TFsmInstanceService';
import type { TDisposable } from '@/Engine/Mixins';

export function FsmInstanceService(factory: TFsmInstanceFactory, registry: TFsmInstanceRegistry): TFsmInstanceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmWrapper): void => registry.add(fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (source: TFsmSource): TFsmWrapper => factory.create(source);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    getFactory: (): TFsmInstanceFactory => factory,
    getRegistry: (): TFsmInstanceRegistry => registry
  });
}
