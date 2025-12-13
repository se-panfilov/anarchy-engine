import type { Subscription } from 'rxjs';

import type { TMaterialConfig, TMaterialFactory, TMaterialParams, TMaterialRegistry, TMaterialService, TMaterialServiceDependencies, TMaterialWrapper } from '@/Engine/Material/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry, dependencies: TMaterialServiceDependencies): TMaterialService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));

  const create = (params: TMaterialParams): TMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<TMaterialConfig>): ReadonlyArray<TMaterialWrapper> =>
    material.map((config: TMaterialConfig): TMaterialWrapper => create(factory.configToParams(config, dependencies)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TMaterialFactory => factory,
    getRegistry: (): TMaterialRegistry => registry,
    ...destroyable
  };
}
