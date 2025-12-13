import type { ColorRepresentation } from 'three/src/utils';

export interface LightParams {
  readonly type: 'ambient' | 'directional';
  readonly color: ColorRepresentation;
  readonly intensity?: number;
}
