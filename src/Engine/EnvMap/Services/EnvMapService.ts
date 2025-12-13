import { Subject } from 'rxjs';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { IDataTexture, IEnvMapService } from '@/Engine/EnvMap/Models';
import type { IWriteable } from '@/Engine/Utils';

export function EnvMapService(): IEnvMapService {
  const envMapLoader: RGBELoader = new RGBELoader();
  const added$: Subject<IDataTexture> = new Subject<IDataTexture>();

  function load(url: string): Promise<IDataTexture> {
    return envMapLoader.loadAsync(url).then((texture: IWriteable<IDataTexture>): IDataTexture => {
      // eslint-disable-next-line functional/immutable-data
      texture.mapping = EquirectangularReflectionMapping;
      setTimeout(() => added$.next(texture), 1000);
      added$.next(texture);
      return texture;
    });
  }

  return { load, added$: added$.asObservable() };
}
