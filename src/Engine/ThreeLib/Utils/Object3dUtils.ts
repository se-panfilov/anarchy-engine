import { EulerWrapper } from '@/Engine/Euler';
import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib/Models';
import { isDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export function configToParamsObject3d(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  let result = { ...config } as TObject3DParams;

  // TODO LAYERS: layers are not supported at the moment
  if (isDefined(config.layers)) result = { ...result, layers: undefined };
  // TODO ANIMATIONS: animations are not supported at the moment
  // if (isDefined(config.animations)) result = { ...result, animations: config.animations };

  if (isDefined(position)) result = { ...result, position: Vector3Wrapper(position) };
  if (isDefined(rotation)) result = { ...result, rotation: EulerWrapper(rotation) };
  if (isDefined(scale)) result = { ...result, scale: Vector3Wrapper(scale) };

  return result;
}
