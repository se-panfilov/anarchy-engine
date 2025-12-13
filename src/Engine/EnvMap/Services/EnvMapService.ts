import { Subject } from 'rxjs';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TAddedTexturePack, TDataTexture, TEnvMapAsyncRegistry, TEnvMapService } from '@/Engine/EnvMap/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function EnvMapService(registry: TEnvMapAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  // TODO 9.0.0. RESOURCES: perhaps, we need an entity here, or the mixin should be adjusted
  const withActive: TWithActiveMixinResult<TAddedTexturePack> = withActiveEntityServiceMixin<TAddedTexturePack>(registry);
  const envMapLoader: RGBELoader = new RGBELoader();
  const added$: Subject<TAddedTexturePack> = new Subject<TAddedTexturePack>();

  added$.subscribe(({ url, texture }: TAddedTexturePack): void => registry.add(url, texture));

  registry.added$.subscribe((): void => {
    // TODO 9.0.0. RESOURCES: Should be able to set active env maps
    // if (wrapper.isActive()) withActive.active$.next(wrapper);
  });

  withActive.active$.subscribe(({ texture }: TAddedTexturePack): void => {
    sceneW.setBackground(texture);
    sceneW.setEnvironmentMap(texture);
  });

  const findActive = withActive.findActive;

  function loadFromConfigAsync(envMaps: ReadonlyArray<string>): Promise<ReadonlyArray<TDataTexture>> {
    return Promise.all(envMaps.map((url: string): Promise<TDataTexture> => loadAsync(url)));
  }

  function loadAsync(url: string, isForce: boolean = false): Promise<TDataTexture> {
    if (!isForce) {
      const texture: TDataTexture | undefined = registry.findByKey(url);
      if (isDefined(texture)) return Promise.resolve(texture);
    }

    return envMapLoader.loadAsync(url).then((texture: TWriteable<TDataTexture>): TDataTexture => {
      // eslint-disable-next-line functional/immutable-data
      texture.mapping = EquirectangularReflectionMapping;
      added$.next({ url: url, texture: texture });
      return texture;
    });
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    // TODO DESTROY: We need a way to unload env maps, tho
    registry.destroy();
    added$.unsubscribe();
    added$.complete();
    withActive.active$.unsubscribe();
    withActive.active$.complete();
  });

  return {
    loadAsync,
    loadFromConfigAsync,
    added$: added$.asObservable(),
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$.asObservable(),
    getRegistry: (): TEnvMapAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
