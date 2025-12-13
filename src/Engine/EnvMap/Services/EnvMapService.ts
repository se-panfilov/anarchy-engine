import { Subject } from 'rxjs';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TAddedTexturePack, TDataTexture, TEnvMapAsyncRegistry, TEnvMapService } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function EnvMapService(registry: TEnvMapAsyncRegistry): TEnvMapService {
  const envMapLoader: RGBELoader = new RGBELoader();
  const added$: Subject<TAddedTexturePack> = new Subject<TAddedTexturePack>();

  added$.subscribe(({ url, texture }: TAddedTexturePack): void => registry.add(url, texture));

  function loadFromConfigAsync(envMaps: ReadonlyArray<string>): ReadonlyArray<Promise<TDataTexture>> {
    return envMaps.map((url: string): Promise<TDataTexture> => loadAsync(url));
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

  return { loadAsync, loadFromConfigAsync, added$: added$.asObservable() };
}
