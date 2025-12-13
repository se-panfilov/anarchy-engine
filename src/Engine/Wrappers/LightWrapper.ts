import { AmbientLight, DirectionalLight } from 'three';
import type { ColorRepresentation } from 'three/src/utils';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

export class LightWrapper extends AbstractWrapper<AmbientLight | DirectionalLight> {
  public entity: AmbientLight | DirectionalLight;

  constructor(params: LightParams) {
    super();
    this.entity = getLight(params);
  }
}

function getLight({ type, color, intensity }: LightParams): AmbientLight | DirectionalLight | never {
  switch (type) {
    case 'ambient':
      return new AmbientLight(color, intensity);
    case 'directional':
      return new DirectionalLight(color, intensity);
    default:
      throw new Error('Unknown light type');
  }
}

export interface LightParams {
  readonly type: 'ambient' | 'directional';
  readonly color: ColorRepresentation;
  readonly intensity?: number;
}
