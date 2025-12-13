import { Subject } from 'rxjs';
import type { AnyMapping } from 'three';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TEnvMap, TEnvMapAsyncRegistry, TEnvMapConfigPack, TEnvMapLoader, TEnvMapParamsPack, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import { EnvMapWrapperAsync } from '@/Engine/EnvMap/Wrappers';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: add loaders for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loaded$: Subject<TEnvMapWrapperAsync> = new Subject<TEnvMapWrapperAsync>();

  function loadFromConfigAsync(envMaps: ReadonlyArray<TEnvMapConfigPack>): Promise<ReadonlyArray<TEnvMapWrapperAsync>> {
    return Promise.all(envMaps.map((pack: TEnvMapConfigPack): Promise<TEnvMapWrapperAsync> => loadAsync(pack)));
  }

  function loadAsync(pack: TEnvMapConfigPack, isForce: boolean = false, mapping: AnyMapping = EquirectangularReflectionMapping): Promise<TEnvMapWrapperAsync> {
    const { url, isActive } = pack;
    if (!isForce) {
      const wrapper: TEnvMapWrapperAsync | undefined = registry.findByKey(url);
      if (isDefined(wrapper)) return Promise.resolve(wrapper);
    }

    return envMapLoader.loadAsync(url).then((texture: TWriteable<TEnvMap>): TEnvMapWrapperAsync => {
      // eslint-disable-next-line functional/immutable-data
      texture.mapping = mapping;
      const pack: TEnvMapParamsPack = { url: url, texture: texture, isActive };
      const wrapper = EnvMapWrapperAsync(pack);
      loaded$.next(wrapper);
      return wrapper;
    });
  }

  return {
    loadAsync,
    loadFromConfigAsync,
    loaded$
  };
}
