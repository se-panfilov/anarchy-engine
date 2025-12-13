import type { TGetParamsFn } from '@Engine/Abstract';
import { ControlsType } from '@Engine/Controls/Constants';
import type {
  TAdditionalControlsConfigParams,
  TControlsConfig,
  TControlsParams,
  TFpsControlsConfig,
  TFpsControlsParams,
  TOrbitControlsConfig,
  TOrbitControlsConfigOptions,
  TOrbitControlsParams,
  TOrbitControlsParamsOptions
} from '@Engine/Controls/Models';
import { isDefined, isNotDefined } from '@Shared/Utils';
import { Vector3 } from 'three';

export const configToParams: TGetParamsFn<TControlsParams, TControlsConfig> = (config: TControlsConfig, additional: TAdditionalControlsConfigParams): TControlsParams | never => {
  if (config.type === ControlsType.OrbitControls) return getOrbitControlsParams(config as TOrbitControlsConfig, additional);
  if (config.type === ControlsType.FirstPersonControls) return getFpsControlsParams(config as TFpsControlsConfig, additional);
  throw new Error(`Cannot create controls of unknown type "${config.type}"`);
};

function getOrbitControlsParams(config: TOrbitControlsConfig, { camera, canvas }: TAdditionalControlsConfigParams): TOrbitControlsParams {
  if (config.type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);
  const { options, ...rest } = config;
  const paramsOptions: TOrbitControlsParamsOptions = getOptionsFromConfig(options);

  return {
    ...rest,
    options: paramsOptions,
    camera,
    target: isDefined(config.target) ? new Vector3().copy(config.target) : new Vector3(),
    canvas
  };
}

function getOptionsFromConfig(options: TOrbitControlsConfigOptions | undefined): TOrbitControlsParamsOptions {
  if (isNotDefined(options)) return {};

  const { cursor, ...rest } = options;

  let result: TOrbitControlsParamsOptions = { ...rest };
  if (isDefined(cursor)) result = { ...result, cursor: new Vector3(cursor.x, cursor.y, cursor.z) };

  return result;
}

function getFpsControlsParams(config: TFpsControlsConfig, { camera, canvas }: TAdditionalControlsConfigParams): TFpsControlsParams {
  if (config.type !== ControlsType.FirstPersonControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);

  return { ...config, camera, canvas };
}
