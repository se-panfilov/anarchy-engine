import { Vector3 } from 'three';

import type { TGetParamsFn } from '@/Engine/Abstract';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { TAdditionalControlsConfigParams, TControlsConfig, TControlsParams, TFpsControlsConfig, TFpsControlsParams, TOrbitControlsConfig, TOrbitControlsParams } from '@/Engine/Controls/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export const configToParams: TGetParamsFn<TControlsParams, TControlsConfig> = (config: TControlsConfig, additional: TAdditionalControlsConfigParams): TControlsParams | never => {
  if (config.type === ControlsType.OrbitControls) return getOrbitControlsParams(config as TOrbitControlsConfig, additional);
  if (config.type === ControlsType.FirstPersonControls) return getFpsControlsParams(config as TFpsControlsConfig, additional);
  throw new Error(`Cannot create controls of unknown type "${config.type}"`);
};

function getOrbitControlsParams(config: TOrbitControlsConfig, { camera, canvas }: TAdditionalControlsConfigParams): TOrbitControlsParams {
  if (config.type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);
  const { target, cursor, ...rest } = config;

  let result: TWriteable<TControlsParams> = {
    ...rest,
    camera,
    canvas,
    enableDamping: config.enableDamping
  };

  if (isDefined(target)) result = { ...result, target: new Vector3(target.x, target.y, target.z) };
  if (isDefined(cursor)) result = { ...result, cursor: new Vector3(cursor.x, cursor.y, cursor.z) };

  return result;
}

function getFpsControlsParams(config: TFpsControlsConfig, { camera }: TAdditionalControlsConfigParams): TFpsControlsParams {
  if (config.type !== ControlsType.FirstPersonControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);

  return { ...config, camera };
}
