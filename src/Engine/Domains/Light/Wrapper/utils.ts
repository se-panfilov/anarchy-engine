import { AmbientLight, DirectionalLight } from 'three';

import type { IAmbientLight, IDirectionalLight, ILightParams } from '@/Engine/Domains/Light/Models';

export function getLight({ type, color, intensity }: ILightParams): IAmbientLight | IDirectionalLight | never {
  switch (type) {
    case 'ambient':
      return new AmbientLight(color, intensity);
    case 'directional':
      return new DirectionalLight(color, intensity);
    default:
      throw new Error('Unknown light type');
  }
}
