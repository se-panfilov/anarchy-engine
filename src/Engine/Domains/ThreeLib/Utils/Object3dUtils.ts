import { EulerWrapper } from '@/Engine/Domains/Euler';
import type { IObject3DParams, IObject3DPropConfig } from '@/Engine/Domains/ThreeLib/Models';
import { Vector3Wrapper } from '@/Engine/Domains/Vector';
import { isDefined } from '@/Engine/Utils';

export function configToParamsObject3d(config: Partial<IObject3DPropConfig>): IObject3DParams {
  const { position, rotation, scale } = config;
  return {
    ...config,
    // TODO (S.Panfilov) debug (wtf is layers?)
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO (S.Panfilov) wtf is animations?
    animations: [],

    position: isDefined(position) ? Vector3Wrapper(position) : undefined,
    rotation: isDefined(rotation) ? EulerWrapper(rotation) : undefined,
    scale: isDefined(scale) ? Vector3Wrapper(scale) : undefined
  };
}
