import { Subject } from 'rxjs';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TEnvMap, TEnvMapAsyncRegistry, TEnvMapLoader, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';
import { findByUrl, isDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: add loaders folder for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loaded$: Subject<TEnvMap> = new Subject<TEnvMap>();

  function loadFromConfigAsync(urls: ReadonlyArray<string>): Promise<ReadonlyArray<TEnvMap>> {
    return Promise.all(urls.map((url: string): Promise<TEnvMap> => loadAsync(url)));
  }

  function loadAsync(url: string, isForce: boolean = false): Promise<TEnvMap> {
    if (!isForce) {
      // TODO 9.0.0. RESOURCES: use findByUrl everywhere in loaders, instead of having registries with uniq urls (we need to have a way to load multiple entities with the same url)
      const wrapper: TEnvMapWrapperAsync | undefined = findByUrl(url, registry);
      if (isDefined(wrapper)) return Promise.resolve(wrapper.entity);
    }

    return envMapLoader.loadAsync(url).then((texture: TWriteable<TEnvMap>): TEnvMap => {
      loaded$.next(texture);
      return texture;
    });
  }

  return {
    loadAsync,
    loadFromConfigAsync,
    loaded$
  };
}
