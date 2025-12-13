import { Subject } from 'rxjs';
import type { Group, Mesh } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimationsPack, TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { model3dConfigToParams } from '@/Engine/Models3d/Adapters';
import { Model3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dLoadResult, TModel3dParams, TModels3dAsyncRegistry, TModels3dService, TPerformLoadResult } from '@/Engine/Models3d/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

import { applyPosition, applyRotation, applyScale } from './Models3dServiceHelper';

export function Models3dService(registry: TModels3dAsyncRegistry, animationsService: TAnimationsService, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<TPerformLoadResult> = new Subject<TPerformLoadResult>();
  const animationsRegistry = animationsService.getRegistry();

  added$.subscribe(({ result, isExisting }: TPerformLoadResult): void => {
    const { url, model, animations, options } = result;
    if (options.shouldSaveToRegistry && !isExisting) {
      registry.add(url, model);
      animationsService.add({ url, pack: animations });
    }
    if (options.shouldAddToScene) sceneW.addModel(model);
  });

  function performLoad({ url, options }: TModel3dParams): Promise<TPerformLoadResult> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    const preResult: Pick<TModel3dLoadResult, 'url' | 'options'> = { url, options };
    if (!options.isForce) {
      const model: Mesh | Group | undefined = registry.findByKey(url);
      const animations: TAnimationsPack | undefined = animationsRegistry.findByKey(url);
      if (isDefined(model)) return Promise.resolve({ result: { ...preResult, model, animations: animations ?? {} }, isExisting: true });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TPerformLoadResult => {
      return { result: { ...preResult, model: gltf.scene, animations: animationsService.gltfAnimationsToPack(gltf.animations) }, isExisting: false };
    });
  }

  function loadFromConfigAsync(config: ReadonlyArray<TModel3dConfig>): ReadonlyArray<Promise<TModel3dLoadResult>> {
    return loadAsync(config.map(model3dConfigToParams));
  }

  function loadAsync(model3dList: ReadonlyArray<TModel3dParams>): ReadonlyArray<Promise<TModel3dLoadResult>> {
    let promises: ReadonlyArray<Promise<TModel3dLoadResult>> = [];

    model3dList.forEach((m: TModel3dParams): void => {
      const p: Promise<TModel3dLoadResult> = performLoad(m).then(({ result, isExisting }: TPerformLoadResult): TModel3dLoadResult => {
        //adjust model before adding to scene and registries
        if (isDefined(m.scale)) applyScale(result.model, m.scale);
        if (isDefined(m.rotation)) applyRotation(result.model, m.rotation);
        if (isDefined(m.position)) applyPosition(result.model, m.position);

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
    ...destroyable
  };
}
