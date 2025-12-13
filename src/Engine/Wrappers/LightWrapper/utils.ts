import type { LightParams } from '@Engine/Models';
import { AmbientLight, DirectionalLight } from 'three';

export function getLight({ type, color, intensity }: LightParams): AmbientLight | DirectionalLight | never {
  switch (type) {
    case 'ambient':
      return new AmbientLight(color, intensity);
    case 'directional':
      return new DirectionalLight(color, intensity);
    default:
      throw new Error('Unknown light type');
  }
}
