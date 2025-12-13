import type { TObject3DParams, TObject3DPropConfig } from '@Engine/ThreeLib/Models';
import { isDefined } from '@Engine/Utils';
import { Euler, Vector3 } from 'three';

export function configToParamsObject3d(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  const result = { ...config } as TObject3DParams;

  return {
    ...result,
    position: isDefined(position) ? new Vector3(position.x, position.y, position.z) : new Vector3(),
    rotation: isDefined(rotation) ? new Euler(rotation.x, rotation.y, rotation.z) : new Euler(),
    scale: isDefined(scale) ? new Vector3(scale.x, scale.y, scale.z) : new Vector3(1, 1, 1)
  };
}
