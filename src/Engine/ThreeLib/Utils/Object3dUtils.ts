import { EulerWrapper } from '@/Engine/Euler';
import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib/Models';
import { isDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export function configToParamsObject3d(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  return {
    ...config,
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO wtf is animations?
    animations: [],

    position: isDefined(position) ? Vector3Wrapper(position) : undefined,
    rotation: isDefined(rotation) ? EulerWrapper(rotation) : undefined,
    scale: isDefined(scale) ? Vector3Wrapper(scale) : undefined
  };
}
