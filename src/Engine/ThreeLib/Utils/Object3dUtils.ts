import { Euler, Layers, Vector3 } from 'three';

import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParamsObject3d(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  let result = { ...config } as TObject3DParams;

  if (isDefined(config.layers)) {
    const layers = new Layers();
    layers.set(config.layers);
    result = { ...result, layers };
  }

  // Animations is a  responsibilities of Model3d and Animations domains, here we do nothing with that
  // if (isDefined(config.animations)) result = { ...result, animations: config.animations };

  return {
    ...result,
    position: isDefined(position) ? new Vector3(position.x, position.y, position.z) : new Vector3(),
    rotation: isDefined(rotation) ? new Euler(rotation.x, rotation.y, rotation.z) : new Euler(),
    scale: isDefined(scale) ? new Vector3(scale.x, scale.y, scale.z) : new Vector3(1, 1, 1)
  };
}
