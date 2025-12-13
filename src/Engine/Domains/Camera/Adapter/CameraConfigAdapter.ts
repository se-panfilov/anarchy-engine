import type { ICameraConfig, ICameraParams } from '@/Engine/Domains/Camera/Models';
import { isDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ICameraConfig): ICameraParams {
  const { position, rotation, scale, lookAt, ...rest } = config;

  return {
    ...rest,

    // TODO (S.Panfilov) CWP object3dAdapter//////////
    // TODO (S.Panfilov) debug (wtf layers?)
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO (S.Panfilov) wtf animations?
    animations: [],

    // TODO (S.Panfilov) does it right type?

    position: Vector3Wrapper(position),
    rotation: isDefined(rotation) ? EulerWrapper(rotation) : undefined,
    scale: isDefined(scale) ? Vector3Wrapper(scale) : undefined,
    // TODO (S.Panfilov) End object3dAdapter//////////
    lookAt: lookAt ? Vector3Wrapper({ x: lookAt.x, y: lookAt.y, z: lookAt.z }) : undefined
  };
}
