import { Subject } from 'rxjs';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TEnvMapLoader, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/Engine/EnvMap/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: We shall create an abstract loader (for all resources)
// TODO 9.0.0. RESOURCES: add loaders folder for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapTextureAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loaded$: Subject<TEnvMapTexture> = new Subject<TEnvMapTexture>();

  function loadFromConfigAsync(configs: ReadonlyArray<TEnvMapResourceConfig>): Promise<ReadonlyArray<TEnvMapTexture>> {
    return Promise.all(configs.map((config: TEnvMapResourceConfig): Promise<TEnvMapTexture> => loadAsync(config)));
  }

  function loadAsync({ url, isForce, name, params }: TEnvMapResourceConfig): Promise<TEnvMapTexture> {
    if (!isForce) {
      // TODO 9.0.0. RESOURCES: use findByKey(name) everywhere in loaders, instead of having registries with uniq urls (we need to have a way to load multiple entities with the same texture)
      const texture: TEnvMapTexture | undefined = registry.findByKey(name);
      if (isDefined(texture)) return Promise.resolve(texture);
    }

    return envMapLoader.loadAsync(url).then((envMap: TWriteable<TEnvMapTexture>): TEnvMapTexture => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
      envMap.mapping = isDefined(params?.mapping) ? params.mapping : EquirectangularReflectionMapping;
      registry.add(name, envMap);
      loaded$.next(envMap);
      return envMap;
    });
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
  });

  return {
    loadAsync,
    loadFromConfigAsync,
    loaded$,
    ...destroyable
  };
}
