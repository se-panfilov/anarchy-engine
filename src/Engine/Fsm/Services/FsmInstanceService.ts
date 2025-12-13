import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFsmSource } from '@/Engine/Fsm';
import type { TFsmInstanceFactory, TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TFsmInstanceService } from '@/Engine/Fsm/Models/TFsmInstanceService';

export function FsmInstanceService(factory: TFsmInstanceFactory, registry: TFsmInstanceRegistry): TFsmInstanceService {
  const abstractService: TAbstractService = AbstractService();
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmWrapper): void => registry.add(fsm));

  const create = (source: TFsmSource): TFsmWrapper => factory.create(source);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    getFactory: (): TFsmInstanceFactory => factory,
    getRegistry: (): TFsmInstanceRegistry => registry
  });
}
