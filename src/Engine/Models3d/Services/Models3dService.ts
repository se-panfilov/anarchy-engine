import { Subject } from 'rxjs';
import type { AnimationClip, Group } from 'three';
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
  // TODO enable dracoPath
  // dracoLoader.setDecoderPath(dracoPath);
  models3dLoader.setDRACOLoader(dracoLoader);
  const added$: Subject<TModel3dLoadResult> = new Subject<TModel3dLoadResult>();

  added$.subscribe((pack: TModel3dLoadResult): void => {
    models3dRegistry.add(pack.url, pack.model);
    models3dAnimationsRegistry.add(pack.url, pack.animations);
  });

  // TODO enable uplaod from config
  // function loadFromConfigAsync(models3ds: ReadonlyArray<string>): ReadonlyArray<Promise<Mesh>> {
  //   return models3ds.map((url: string): Promise<Mesh> => loadAsync(url));
  // }

  function loadAsync({ url }: TModel3dParams, shouldAddToScene: boolean, isForce: boolean = false): Promise<TModel3dLoadResult> {
    if ([...Object.values(Model3dType)].includes(url as Model3dType)) throw new Error(`Trying to load a primitive(e.g. cube, sphere, etc.) as an imported model: ${url}`);

    // TODO debug
    if (!isForce) {
      const model: Group | undefined = models3dRegistry.findByKey(url);
      const animations: ReadonlyArray<AnimationClip> | undefined = models3dAnimationsRegistry.findByKey(url);
      if (isDefined(model)) return Promise.resolve({ url, model, animations: animations ?? [] });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TModel3dLoadResult => {
      const result: TModel3dLoadResult = { url, model: gltf.scene, animations: gltf.animations };
      added$.next(result);

      if (shouldAddToScene) sceneW.addModel(gltf.scene);

      return result;
    });
  }

  return {
    loadAsync,
    // TODO debug
    // loadFromConfigAsync,
    added$: added$.asObservable()
  };
}
