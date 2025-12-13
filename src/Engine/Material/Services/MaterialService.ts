import type { TMaterialConfig, TMaterialFactory, TMaterialParams, TMaterialRegistry, TMaterialService, TMaterialWrapper } from '@/Engine/Material/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TModel3dConfigMaterialConfig } from '@/Engine/Models3d';
import { isNotDefined } from '@/Engine/Utils';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry): TMaterialService {
  factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));

  const create = (params: TMaterialParams): TMaterialWrapper => factory.create(params);
  const createFromConfig = (material: ReadonlyArray<TMaterialConfig>): void => material.forEach((config: TMaterialConfig): TMaterialWrapper => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  function getMaterialWithOverrides(config: TModel3dConfigMaterialConfig): TMaterialWrapper | undefined {
    const material: TMaterialWrapper | undefined = registry.findByName(config.presetName);
    if (isNotDefined(material)) return undefined;

    // TODO MODELS: Overrides doesn't work, fix it
    // return create(material._clone(config.overrides));

    // TODO debug
    return material;
  }

  return {
    create,
    createFromConfig,
    getMaterialWithOverrides,
    getFactory: (): TMaterialFactory => factory,
    getRegistry: (): TMaterialRegistry => registry,
    ...destroyable
  };
}
