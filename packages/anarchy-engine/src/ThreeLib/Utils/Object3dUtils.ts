import type { TObject3DParams, TObject3DPropConfig } from '@hellpig/anarchy-engine/ThreeLib/Models';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
import { Euler, Vector3 } from 'three';

export function object3dConfigToParams(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  const result = { ...config } as TObject3DParams;

  return {
    ...result,
    position: isDefined(position) ? new Vector3(position.x, position.y, position.z) : new Vector3(),
    rotation: isDefined(rotation) ? new Euler(rotation.x, rotation.y, rotation.z) : new Euler(),
    scale: isDefined(scale) ? new Vector3(scale.x, scale.y, scale.z) : new Vector3(1, 1, 1)
  };
}
