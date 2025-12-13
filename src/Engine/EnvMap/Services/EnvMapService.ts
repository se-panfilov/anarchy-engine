import { Subject } from 'rxjs';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TDataTexture, TEnvMapService } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';

export function EnvMapService(): TEnvMapService {
  const envMapLoader: RGBELoader = new RGBELoader();
  const added$: Subject<TDataTexture> = new Subject<TDataTexture>();

  function load(url: string): Promise<TDataTexture> {
    return envMapLoader.loadAsync(url).then((texture: TWriteable<TDataTexture>): TDataTexture => {
      // eslint-disable-next-line functional/immutable-data
      texture.mapping = EquirectangularReflectionMapping;
      setTimeout(() => added$.next(texture), 1000);
      added$.next(texture);
      return texture;
    });
  }

  return { load, added$: added$.asObservable() };
}
