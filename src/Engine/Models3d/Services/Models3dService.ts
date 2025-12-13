import { Subject } from 'rxjs';
import type { AnimationClip, Group, Mesh } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Model3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dLoadResult, TModel3dParams, TModels3dAnimationsAsyncRegistry, TModels3dAsyncRegistry, TModels3dService } from '@/Engine/Models3d/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

export function Models3dService(models3dRegistry: TModels3dAsyncRegistry, models3dAnimationsRegistry: TModels3dAnimationsAsyncRegistry, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<TModel3dLoadResult> = new Subject<TModel3dLoadResult>();

  added$.subscribe(({ url, model, animations, options }: TModel3dLoadResult): void => {
    if (options.shouldSaveToRegistry) {
      models3dRegistry.add(url, model);
      models3dAnimationsRegistry.add(url, animations);
    }
    if (options.shouldAddToScene) sceneW.addModel(model);
  });

  // TODO (S.Panfilov) 1. CWP implement loading of array of models (loadAsync)
  // TODO (S.Panfilov) 2. CWP fix loadFromConfigAsync
  // TODO (S.Panfilov) 3. CWP load some models from showcase.json
  // TODO (S.Panfilov) 4. CWP add validation rules for models3ds (in config)
  // TODO (S.Panfilov) 5. CWP implement models load via actor (merge branch and create a new one before doing this)
  function loadFromConfigAsync(models3ds: ReadonlyArray<string>): ReadonlyArray<Promise<Mesh>> {
    return models3ds.map((url: string): Promise<Mesh> => loadAsync(url));
  }

  function loadAsync({ url, options }: TModel3dParams): Promise<TModel3dLoadResult> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    if (!options.isForce) {
      const model: Mesh | Group | undefined = models3dRegistry.findByKey(url);
      const animations: ReadonlyArray<AnimationClip> | undefined = models3dAnimationsRegistry.findByKey(url);
      if (isDefined(model)) return Promise.resolve({ url, model, animations: animations ?? [], options });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TModel3dLoadResult => {
      const result: TModel3dLoadResult = { url, model: gltf.scene, animations: gltf.animations, options };
      added$.next(result);

      return result;
    });
  }

  return {
    loadAsync,
    loadFromConfigAsync,
    added$: added$.asObservable()
  };
}
