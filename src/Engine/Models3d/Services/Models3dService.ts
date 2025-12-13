import { Subject } from 'rxjs';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { model3dConfigComplexToParams, model3dConfigPrimitiveToParams } from '@/Engine/Models3d/Adapters';
import type {
  TModel3dComplexConfig,
  TModel3dComplexFacade,
  TModel3dComplexParams,
  TModel3dConfig,
  TModel3dFacade,
  TModel3dPack,
  TModel3dPrimitiveConfig,
  TModel3dPrimitiveFacade,
  TModel3dPrimitiveParams,
  TModels3dAsyncRegistry,
  TModels3dService,
  TModels3dServiceDependencies,
  TPerformLoadResult
} from '@/Engine/Models3d/Models';
import { createPrimitiveModel3dPack, isPrimitive, isPrimitiveFacade } from '@/Engine/Models3d/Utils';
import { Model3dComplexFacade, Model3dPrimitiveFacade } from '@/Engine/Models3d/Wrappers';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function Models3dService(registry: TModels3dAsyncRegistry, { animationsService, materialService }: TModels3dServiceDependencies, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const loaded$: Subject<TModel3dComplexFacade> = new Subject<TModel3dComplexFacade>();
  const added$: Subject<TModel3dFacade> = new Subject<TModel3dFacade>();

  added$.subscribe((facade: TModel3dFacade): void => {
    const options = facade.getOptions();
    if (options.shouldAddToRegistry) registry.add(facade);
    if (options.shouldAddToScene) sceneW.addModel(facade.getModel());
  });

  loaded$.subscribe((facade: TModel3dFacade): void => added$.next(facade));

  function createFromPack(pack: TModel3dPack): TModel3dFacade {
    const facade: TModel3dFacade = isPrimitive(pack) ? Model3dPrimitiveFacade(createPrimitiveModel3dPack(pack)) : Model3dComplexFacade(pack, animationsService);
    added$.next(facade);
    return facade;
  }

  function performLoad(params: TModel3dComplexParams): Promise<TPerformLoadResult> {
    const { url, options } = params;

    if (!options.isForce) {
      const model3dFacade: TModel3dComplexFacade | undefined = registry.find((facade: TModel3dFacade): boolean => !isPrimitiveFacade(facade) && facade.getUrl() === url) as TModel3dComplexFacade;
      if (isDefined(model3dFacade)) return Promise.resolve({ result: model3dFacade, isExisting: true });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TPerformLoadResult => {
      return { result: Model3dComplexFacade({ ...params, model: gltf.scene, animations: gltf.animations }, animationsService), isExisting: false };
    });
  }

  function createFromConfigAsync(config: ReadonlyArray<TModel3dConfig>): Promise<ReadonlyArray<TModel3dFacade>> {
    let primitiveModelsConfigs: ReadonlyArray<TModel3dPrimitiveConfig> = [];
    let complexModelsConfigs: ReadonlyArray<TModel3dComplexConfig> = [];

    config.forEach((c: TModel3dConfig) => {
      if (isPrimitive(c)) primitiveModelsConfigs = [...primitiveModelsConfigs, c];
      else complexModelsConfigs = [...complexModelsConfigs, c];
    });

    return Promise.all([...loadFromConfigAsync(complexModelsConfigs), ...createPrimitiveFromConfig(primitiveModelsConfigs)]);
  }

  const loadFromConfigAsync = (config: ReadonlyArray<TModel3dComplexConfig>): ReadonlyArray<Promise<TModel3dComplexFacade>> =>
    loadAsync(config.map((c) => model3dConfigComplexToParams(c, { materialService })));
  const createPrimitiveFromConfig = (config: ReadonlyArray<TModel3dPrimitiveConfig>): ReadonlyArray<Promise<TModel3dPrimitiveFacade>> =>
    createPrimitiveAsync(config.map((c) => model3dConfigPrimitiveToParams(c, { materialService })));

  function loadAsync(model3dList: ReadonlyArray<TModel3dComplexParams>): ReadonlyArray<Promise<TModel3dComplexFacade>> {
    let promises: ReadonlyArray<Promise<TModel3dComplexFacade>> = [];

    model3dList.forEach((m: TModel3dComplexParams): void => {
      const p: Promise<TModel3dComplexFacade> = performLoad(m).then(({ result, isExisting }: TPerformLoadResult): TModel3dComplexFacade => {
        if (!isExisting) loaded$.next(result);
        return result;
      });

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      promises = [...promises, p];
    });

    return promises;
  }

  function clone(model3dFacade: TModel3dFacade, overrides?: TOptional<TModel3dPack>): TModel3dFacade {
    const cloned = model3dFacade._clone(overrides);
    added$.next(cloned);
    return cloned;
  }

  function createPrimitiveAsync(params: ReadonlyArray<TModel3dPrimitiveParams>): ReadonlyArray<Promise<TModel3dPrimitiveFacade>> {
    return params.map((p: TModel3dPrimitiveParams): Promise<TModel3dPrimitiveFacade> => Promise.resolve(createFromPack(createPrimitiveModel3dPack(p)) as TModel3dPrimitiveFacade));
  }

  // TODO 8.0.0. MODELS: test if model can be found by preset name
  // TODO 8.0.0. MODELS: test if overrides are working
  // function findModel3dAndOverride(name: string, overrides?: TOptional<TModel3dConfig>): TModel3dFacade | undefined {
  // TODO 8.0.0. MODELS: debug signature
  function findModel3dAndOverride(name: string): TModel3dFacade | undefined {
    const model3d: TModel3dFacade | undefined = registry.findByName(name);
    if (isNotDefined(model3d)) return undefined;

    // TODO 8.0.0. MODELS: Overrides doesn't work, fix: TModel3dConfig vs TModel3dPack issue
    // return clone(model3d, overrides);

    return clone(model3d);
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();

    added$.complete();
    added$.unsubscribe();

    loaded$.complete();
    loaded$.unsubscribe();
  });

  return {
    loadAsync,
    loadFromConfigAsync,
    createFromPack,
    createPrimitiveAsync,
    createFromConfigAsync,
    createPrimitiveFromConfig,
    findModel3dAndOverride,
    added$: added$.asObservable(),
    loaded$: loaded$.asObservable(),
    getRegistry: (): TModels3dAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    getAnimationService: (): TAnimationsService => animationsService,
    clone,
    ...destroyable
  };
}
