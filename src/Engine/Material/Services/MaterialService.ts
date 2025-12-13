import type { TMaterialConfig, TMaterialFactory, TMaterialParams, TMaterialRegistry, TMaterialService, TMaterialServiceDependencies, TMaterialWrapper } from '@/Engine/Material/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry, dependencies: TMaterialServiceDependencies): TMaterialService {
  factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));

  const create = (params: TMaterialParams): TMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<TMaterialConfig>): ReadonlyArray<TMaterialWrapper> =>
    material.map((config: TMaterialConfig): TMaterialWrapper => create(factory.configToParams(config, dependencies)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TMaterialFactory => factory,
    getRegistry: (): TMaterialRegistry => registry,
    ...destroyable
  };
}
