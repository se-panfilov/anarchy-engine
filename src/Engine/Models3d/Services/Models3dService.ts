import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { Models3dLoader } from '@/Engine/Models3d/Loaders';
import type {
  TModel3dConfig,
  TModel3dFacade,
  TModel3dPack,
  TModel3dParams,
  TModel3dRegistry,
  TModel3dResourceAsyncRegistry,
  TModels3dFactory,
  TModels3dLoader,
  TModels3dService,
  TModels3dServiceDependencies
} from '@/Engine/Models3d/Models';
import { createPrimitiveModel3dPack, isPrimitive } from '@/Engine/Models3d/Utils';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TOptional } from '@/Engine/Utils';

export function Models3dService(
  factory: TModels3dFactory,
  registry: TModel3dRegistry,
  resourcesRegistry: TModel3dResourceAsyncRegistry,
  { animationsService, materialService }: TModels3dServiceDependencies,
  sceneW: TSceneWrapper
): TModels3dService {
  factory.entityCreated$.subscribe((wrapper: TModel3dFacade): void => registry.add(wrapper));
  const model3dLoader: TModels3dLoader = Models3dLoader(resourcesRegistry);

  const create = (params: TModel3dParams): TModel3dFacade => factory.create(params, { resourcesRegistry });
  const createFromConfig = (models3d: ReadonlyArray<TModel3dConfig>): void => {
    models3d.forEach((config: TModel3dConfig): TModel3dFacade => factory.create(factory.configToParams(config, { resourcesRegistry })));
  };

  function createFromPack(pack: TModel3dPack): TModel3dFacade {
    const facade: TModel3dFacade = isPrimitive(pack) ? Model3dPrimitiveFacade(createPrimitiveModel3dPack(pack)) : Model3dFacade(pack, animationsService);
    registry.add(facade);
    return facade;
  }

  // function createFromConfigAsync(config: ReadonlyArray<TModel3dConfig>): Promise<ReadonlyArray<TModel3dFacade>> {
  //   let primitiveModelsConfigs: ReadonlyArray<TModel3dConfig> = [];
  //   let complexModelsConfigs: ReadonlyArray<TModel3dConfig> = [];
  //
  //   config.forEach((c: TModel3dConfig) => {
  //     if (isPrimitive(c)) primitiveModelsConfigs = [...primitiveModelsConfigs, c];
  //     else complexModelsConfigs = [...complexModelsConfigs, c];
  //   });
  //
  //   return Promise.all([...loadFromConfigAsync(complexModelsConfigs), ...createPrimitiveFromConfig(primitiveModelsConfigs)]);
  // }

  // const createPrimitiveFromConfig = (config: ReadonlyArray<TModel3dConfig>): ReadonlyArray<Promise<TModel3dPrimitiveFacade>> =>
  //   createPrimitiveAsync(config.map((c) => model3dConfigPrimitiveToParams(c, { materialService })));

  function clone(model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>): TModel3dFacade {
    const cloned = model3dFacade._clone(overrides);
    registry.add(cloned);
    return cloned;
  }

  // function createPrimitiveAsync(params: ReadonlyArray<TModel3dConfig>): ReadonlyArray<Promise<TModel3dPrimitiveFacade>> {
  //   return params.map((p: TModel3dPrimitiveParams): Promise<TModel3dPrimitiveFacade> => Promise.resolve(createFromPack(createPrimitiveModel3dPack(p)) as TModel3dPrimitiveFacade));
  // }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
    // TODO DESTROY: We need a way to unload models3d, tho
    resourcesRegistry.destroy();
  });

  return {
    create,
    createFromConfig,
    loadAsync: model3dLoader.loadAsync,
    loadFromConfigAsync: model3dLoader.loadFromConfigAsync,
    createFromPack,
    getFactory: (): TModels3dFactory => factory,
    getRegistry: (): TModel3dRegistry => registry,
    getResourceRegistry: (): TModel3dResourceAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    getAnimationService: (): TAnimationsService => animationsService,
    clone,
    ...destroyable
  };
}
