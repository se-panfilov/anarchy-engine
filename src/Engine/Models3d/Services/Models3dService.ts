import { Subject } from 'rxjs';
import type { AnimationClip, Group, Mesh } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { model3dConfigToParams } from '@/Engine/Models3d/Adapters';
import { Model3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dLoadResult, TModel3dParams, TModels3dAnimationsAsyncRegistry, TModels3dAsyncRegistry, TModels3dService, TPerformLoadResult } from '@/Engine/Models3d/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

import { applyPosition, applyRotation, applyScale } from './Models3dServiceHelper';

export function Models3dService(models3dRegistry: TModels3dAsyncRegistry, models3dAnimationsRegistry: TModels3dAnimationsAsyncRegistry, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<TPerformLoadResult> = new Subject<TPerformLoadResult>();

  added$.subscribe(({ result, isExisting }: TPerformLoadResult): void => {
    const { url, model, animations, options } = result;
    if (options.shouldSaveToRegistry && !isExisting) {
      models3dRegistry.add(url, model);
      models3dAnimationsRegistry.add(url, animations);
    }
    if (options.shouldAddToScene) sceneW.addModel(model);
  });

  // TODO (S.Panfilov) 6.5 CWP make sure animations works
  // TODO (S.Panfilov) 8. CWP implement models load via actor (merge branch and create a new one before doing this)
  function performLoad({ url, options }: TModel3dParams): Promise<TPerformLoadResult> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    const preResult: Pick<TModel3dLoadResult, 'url' | 'options'> = { url, options };
    if (!options.isForce) {
      const model: Mesh | Group | undefined = models3dRegistry.findByKey(url);
      const animations: Record<string, AnimationClip> | undefined = models3dAnimationsRegistry.findByKey(url);
      if (isDefined(model)) return Promise.resolve({ result: { ...preResult, model, animations: animations ?? {} }, isExisting: true });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TPerformLoadResult => {
      const animations: Record<string, AnimationClip> = {};
      // eslint-disable-next-line functional/immutable-data
      gltf.animations.forEach((a: AnimationClip): void => void (animations[a.name] = a));
      return { result: { ...preResult, model: gltf.scene, animations }, isExisting: false };
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
    models3dRegistry.destroy();
    models3dAnimationsRegistry.destroy();
    added$.complete();
    added$.unsubscribe();
  });

  return {
    loadAsync,
    loadFromConfigAsync,
    added$: added$.asObservable(),
    getRegistry: (): TModels3dAsyncRegistry => models3dRegistry,
    getAnimationsRegistry: (): TModels3dAnimationsAsyncRegistry => models3dAnimationsRegistry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
