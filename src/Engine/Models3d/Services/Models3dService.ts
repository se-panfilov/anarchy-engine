import { Subject } from 'rxjs';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { model3dConfigToParams } from '@/Engine/Models3d/Adapters';
import { Model3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dFacade, TModel3dParams, TModels3dAsyncRegistry, TModels3dService, TPerformLoadResult } from '@/Engine/Models3d/Models';
import { applyPosition, applyRotation, applyScale } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

export function Models3dService(registry: TModels3dAsyncRegistry, animationsService: TAnimationsService, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<TPerformLoadResult> = new Subject<TPerformLoadResult>();

  added$.subscribe(({ result, isExisting }: TPerformLoadResult): void => {
    const options = result.getOptions();
    if (options.shouldSaveToRegistry && !isExisting) registry.add(result);
    if (options.shouldAddToScene) sceneW.addModel(result.getModel());
  });

  function performLoad({ url, options }: TModel3dParams): Promise<TPerformLoadResult> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    if (!options.isForce) {
      const model3dFacade: TModel3dFacade | undefined = registry.find((facade: TModel3dFacade): boolean => facade.getUrl() === url);
      if (isDefined(model3dFacade)) return Promise.resolve({ result: model3dFacade, isExisting: true });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TPerformLoadResult => {
      return { result: Model3dFacade({ url, options, model: gltf.scene, animations: animationsService.gltfAnimationsToPack(gltf.animations) }, animationsService), isExisting: false };
    });
  }

  const loadFromConfigAsync = (config: ReadonlyArray<TModel3dConfig>): ReadonlyArray<Promise<TModel3dFacade>> => loadAsync(config.map(model3dConfigToParams));

  function loadAsync(model3dList: ReadonlyArray<TModel3dParams>): ReadonlyArray<Promise<TModel3dFacade>> {
    let promises: ReadonlyArray<Promise<TModel3dFacade>> = [];

    model3dList.forEach((m: TModel3dParams): void => {
      const p: Promise<TModel3dFacade> = performLoad(m).then(({ result, isExisting }: TPerformLoadResult): TModel3dFacade => {
        //adjust model before adding to scene and registries
        const model = result.getModel();
        if (isDefined(m.scale)) applyScale(model, m.scale);
        if (isDefined(m.rotation)) applyRotation(model, m.rotation);
        if (isDefined(m.position)) applyPosition(model, m.position);

        if (!isExisting) added$.next({ result, isExisting });
        return result;
      });

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      promises = [...promises, p];
    });

    return promises;
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
    added$.complete();
    added$.unsubscribe();
  });

  return {
    loadAsync,
    loadFromConfigAsync,
    added$: added$.asObservable(),
    getRegistry: (): TModels3dAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    getAnimationService: (): TAnimationsService => animationsService,
    ...destroyable
  };
}
