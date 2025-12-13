import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TModels3dConfig, TModels3dFactory, TModels3dParams, TModels3dRegistry, TModels3dService, TModels3dWrapper } from '@/Engine/Models3d/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function Models3dService(factory: TModels3dFactory, registry: TModels3dRegistry, scene: TSceneWrapper): TModels3dService {
  registry.added$.subscribe((models3d: TModels3dWrapper) => scene.setModels3d(models3d));
  factory.entityCreated$.subscribe((models3d: TModels3dWrapper): void => registry.add(models3d));

  const create = (params: TModels3dParams): TModels3dWrapper => factory.create(params);
  const createFromConfig = (models3ds: ReadonlyArray<TModels3dConfig>): void => models3ds.forEach((models3d: TModels3dConfig): TModels3dWrapper => factory.create(factory.configToParams(models3d)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TModels3dFactory => factory,
    getRegistry: (): TModels3dRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
