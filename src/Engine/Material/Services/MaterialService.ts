import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TMaterialConfig, TMaterialFactory, TMaterialParams, TMaterialRegistry, TMaterialService, TMaterialServiceDependencies, TMaterialWrapper } from '@/Engine/Material/Models';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry, dependencies: TMaterialServiceDependencies): TMaterialService {
  const abstractService: TAbstractService = AbstractService();
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));

  const create = (params: TMaterialParams): TMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<TMaterialConfig>): ReadonlyArray<TMaterialWrapper> =>
    material.map((config: TMaterialConfig): TMaterialWrapper => create(factory.configToParams(config, dependencies)));

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
    getFactory: (): TMaterialFactory => factory,
    getRegistry: (): TMaterialRegistry => registry
  });
}
