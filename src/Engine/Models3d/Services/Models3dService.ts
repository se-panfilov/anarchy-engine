import { Subject } from 'rxjs';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimationsService } from '@/Engine/Animations';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { model3dConfigToParams } from '@/Engine/Models3d/Adapters';
import type { TModel3dConfig, TModel3dFacade, TModel3dPack, TModel3dParams, TModel3dPrimitiveParams, TModels3dAsyncRegistry, TModels3dService, TPerformLoadResult } from '@/Engine/Models3d/Models';
import { isPrimitive } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';
import { createPrimitiveModel3dPack } from '@/Engine/Models3d/Wrappers/PrimitiveModels3dUtils';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TOptional } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function Models3dService(registry: TModels3dAsyncRegistry, animationsService: TAnimationsService, sceneW: TSceneWrapper): TModels3dService {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);
  const loaded$: Subject<TModel3dFacade> = new Subject<TModel3dFacade>();
  const added$: Subject<TModel3dFacade> = new Subject<TModel3dFacade>();

  added$.subscribe((facade: TModel3dFacade): void => {
    const options = facade.getOptions();
    if (options.shouldAddToRegistry) registry.add(facade);
    if (options.shouldAddToScene) sceneW.addModel(facade.getModel());
  });

  loaded$.subscribe((facade: TModel3dFacade): void => added$.next(facade));

  function createFromPack(pack: TModel3dPack): TModel3dFacade {
    const facade = Model3dFacade(pack, animationsService);
    added$.next(facade);
    return facade;
  }

  function performLoad(params: TModel3dParams): Promise<TPerformLoadResult> {
    const { url, options } = params;

    if (!options.isForce) {
      const model3dFacade: TModel3dFacade | undefined = registry.find((facade: TModel3dFacade): boolean => facade.getUrl() === url);
      if (isDefined(model3dFacade)) return Promise.resolve({ result: model3dFacade, isExisting: true });
    }

    return models3dLoader.loadAsync(url).then((gltf: GLTF): TPerformLoadResult => {
      return { result: Model3dFacade({ ...params, model: gltf.scene, animations: gltf.animations }, animationsService), isExisting: false };
    });
  }

  const loadFromConfigAsync = (config: ReadonlyArray<TModel3dConfig>): ReadonlyArray<Promise<TModel3dFacade>> => {
    let primitiveModels3d: ReadonlyArray<TModel3dPrimitiveParams> = [];
    let models3d: ReadonlyArray<TModel3dParams> = [];
    config.map(model3dConfigToParams).forEach((m: TModel3dParams | TModel3dPrimitiveParams): void => {
      if (isPrimitive(m)) primitiveModels3d = [...primitiveModels3d, m];
      else models3d = [...models3d, m];
    });
    return [...createPrimitiveAsync(primitiveModels3d), ...loadAsync(models3d)];
  };

  function loadAsync(model3dList: ReadonlyArray<TModel3dParams>): ReadonlyArray<Promise<TModel3dFacade>> {
    let promises: ReadonlyArray<Promise<TModel3dFacade>> = [];

    model3dList.forEach((m: TModel3dParams): void => {
      const p: Promise<TModel3dFacade> = performLoad(m).then(({ result, isExisting }: TPerformLoadResult): TModel3dFacade => {
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

  function createPrimitiveAsync(params: ReadonlyArray<TModel3dPrimitiveParams>): ReadonlyArray<Promise<TModel3dFacade>> {
    return params.map((p: TModel3dPrimitiveParams): Promise<TModel3dFacade> => Promise.resolve(createFromPack(createPrimitiveModel3dPack(p))));
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
    added$: added$.asObservable(),
    loaded$: loaded$.asObservable(),
    getRegistry: (): TModels3dAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    getAnimationService: (): TAnimationsService => animationsService,
    clone,
    ...destroyable
  };
}
