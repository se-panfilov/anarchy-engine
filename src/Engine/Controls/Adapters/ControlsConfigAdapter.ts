import type { TGetParamsFn } from '@/Engine/Abstract';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { TAdditionalControlsConfigParams, TControlsConfig, TControlsParams } from '@/Engine/Controls/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export const configToParams: TGetParamsFn<TControlsParams, TControlsConfig> = (config: TControlsConfig, { camera, canvas }: TAdditionalControlsConfigParams): TControlsParams => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { target, cursor, ...rest } = config;

  if (config.type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${config.type}"`);

  let result: TWriteable<TControlsParams> = {
    ...rest,
    camera,
    canvas,
    enableDamping: config.enableDamping
  };

  if (isDefined(config.target)) result = { ...result, target: config.target };
  if (isDefined(config.cursor)) result = { ...result, cursor: config.cursor };

  return result;
};
