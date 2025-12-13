import { Subject } from 'rxjs';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TEnvMap, TEnvMapAsyncRegistry, TEnvMapConfigPack, TEnvMapLoader, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: add loaders folder for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loaded$: Subject<TEnvMap> = new Subject<TEnvMap>();

  function loadFromConfigAsync(envMaps: ReadonlyArray<TEnvMapConfigPack>): Promise<ReadonlyArray<TEnvMap>> {
    return Promise.all(envMaps.map((pack: TEnvMapConfigPack): Promise<TEnvMap> => loadAsync(pack)));
  }

  function loadAsync(pack: TEnvMapConfigPack, isForce: boolean = false): Promise<TEnvMap> {
    const { url } = pack;
    if (!isForce) {
      const wrapper: TEnvMapWrapperAsync | undefined = registry.findByKey(url);
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
