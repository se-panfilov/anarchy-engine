import type { IMaterialConfig, IMaterialFactory, IMaterialParams, IMaterialRegistry, IMaterialService, IMaterialWrapper } from '@/Engine/Material/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function MaterialService(factory: IMaterialFactory, registry: IMaterialRegistry): IMaterialService {
  factory.entityCreated$.subscribe((wrapper: IMaterialWrapper): void => registry.add(wrapper));

  const create = (params: IMaterialParams): IMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<IMaterialConfig>): void => material.forEach((config: IMaterialConfig): IMaterialWrapper => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): IMaterialFactory => factory,
    getRegistry: (): IMaterialRegistry => registry,
    ...destroyable
  };
}
