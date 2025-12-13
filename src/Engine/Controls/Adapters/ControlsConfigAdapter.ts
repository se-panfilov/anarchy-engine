import type { IGetParamsFn } from '@/Engine/Abstract';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { IAdditionalControlsConfigParams, IControlsConfig, IControlsParams } from '@/Engine/Controls/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export const configToParams: IGetParamsFn<IControlsParams, IControlsConfig> = (config: IControlsConfig, { camera, canvas }: IAdditionalControlsConfigParams): IControlsParams => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { target, cursor, ...rest } = config;

  if (config.type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);

  let result: IWriteable<IControlsParams> = {
    ...rest,
    camera,
    canvas,
    enableDamping: config.enableDamping
  };

  if (isDefined(config.target)) result = { ...result, target: Vector3Wrapper(config.target) };
  if (isDefined(config.cursor)) result = { ...result, cursor: Vector3Wrapper(config.cursor) };

  return result;
};
