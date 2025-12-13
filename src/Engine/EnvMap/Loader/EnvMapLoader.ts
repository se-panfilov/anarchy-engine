import { Subject } from 'rxjs';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TEnvMapLoader, TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: add loaders folder for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapTextureAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loaded$: Subject<TEnvMapTexture> = new Subject<TEnvMapTexture>();

  function loadFromConfigAsync(urls: ReadonlyArray<string>): Promise<ReadonlyArray<TEnvMapTexture>> {
    return Promise.all(urls.map((texture: string): Promise<TEnvMapTexture> => loadAsync(texture)));
  }

  function loadAsync(url: string, isForce: boolean = false): Promise<TEnvMapTexture> {
    if (!isForce) {
      // TODO 9.0.0. RESOURCES: use findByKey(name) everywhere in loaders, instead of having registries with uniq urls (we need to have a way to load multiple entities with the same texture)
      const texture: TEnvMapTexture | undefined = registry.findByKey(name);
      if (isDefined(texture)) return Promise.resolve(texture);
    }

    return envMapLoader.loadAsync(url).then((envMap: TWriteable<TEnvMapTexture>): TEnvMapTexture => {
      loaded$.next(envMap);
      // TODO 9.0.0. RESOURCES: register texture to "EnvMapTextureAsyncRegistry" somewhere here
      return envMap;
    });
  }

  return {
    loadAsync,
    loadFromConfigAsync,
    loaded$
  };
}
