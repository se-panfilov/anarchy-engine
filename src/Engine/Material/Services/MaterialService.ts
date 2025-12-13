import type { TMaterialFactory, TMaterialPackConfig, TMaterialParams, TMaterialRegistry, TMaterialService, TMaterialTexturePack, TMaterialWrapper } from '@/Engine/Material/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry): TMaterialService {
  factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));

  const create = (params: TMaterialParams): TMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<TMaterialPackConfig<TMaterialTexturePack>>): ReadonlyArray<TMaterialWrapper> =>
    material.map((config: TMaterialPackConfig<TMaterialTexturePack>): TMaterialWrapper => create(factory.configToParams(config)));

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
