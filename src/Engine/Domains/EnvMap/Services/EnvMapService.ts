import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { IEnvMapService } from '@/Engine/Domains/EnvMap/Models';

export function EnvMapService(): IEnvMapService {
  const envMapLoader: RGBELoader = new RGBELoader();

  function load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      envMapLoader.load(url, () => resolve(), undefined, reject);
    });
  }

  return { load };
}

export const envMapService: IEnvMapService = EnvMapService();
