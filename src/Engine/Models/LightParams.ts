import type { ColorRepresentation } from 'three/src/utils';

export interface LightParams {
  readonly type: LightType;
  readonly color: ColorRepresentation;
  readonly intensity?: number;
}

export type LightType = 'ambient' | 'directional';
