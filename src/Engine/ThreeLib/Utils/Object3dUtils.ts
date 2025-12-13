import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParamsObject3d(config: Partial<TObject3DPropConfig>): TObject3DParams {
  const { position, rotation, scale } = config;
  let result = { ...config } as TObject3DParams;

  // TODO LAYERS: layers are not supported at the moment
  if (isDefined(config.layers)) result = { ...result, layers: undefined };
  // TODO ANIMATIONS: animations are not supported at the moment
  // if (isDefined(config.animations)) result = { ...result, animations: config.animations };

  if (isDefined(position)) result = { ...result, position };
  if (isDefined(rotation)) result = { ...result, rotation };
  if (isDefined(scale)) result = { ...result, scale };

  return result;
}
