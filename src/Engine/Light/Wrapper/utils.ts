import { AmbientLight, DirectionalLight, PointLight } from 'three';

import { IAmbientLight, IDirectionalLight, ILightParams, IPointLight } from '@/Engine/Light/Models';

export function getLight({ type, color, intensity, distance, decay }: ILightParams): IAmbientLight | IDirectionalLight | IPointLight | never {
  switch (type) {
    case 'ambient':
      return new AmbientLight(color, intensity);
    case 'directional':
      return new DirectionalLight(color, intensity);
    case 'point':
      return new PointLight(color, intensity, distance, decay);
    default:
      throw new Error('Unknown light type');
  }
}
