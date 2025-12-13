import type { IGetParamsFn } from '@/Engine/Domains/Abstract';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IAdditionalControlsConfigParams, IOrbitControlsConfig, IOrbitControlsParams } from '@/Engine/Domains/Controls/Models';
import { IControlsType } from '@/Engine/Domains/Controls/Models';
import { Vector3Wrapper } from '@/Engine/Domains/Vector';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const configToParams: IGetParamsFn<IOrbitControlsParams, IOrbitControlsConfig> = (
  config: IOrbitControlsConfig,
  { cameraRegistry, canvas }: IAdditionalControlsConfigParams
): IOrbitControlsParams => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { target, cursor, ...rest } = config;

  if (config.type !== IControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${config.type as string}"`);
  if (isNotDefined(config.cameraTag)) throw new Error(`Cannot attach controls ("${config.type}") to undefined camera tag`);

  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(config.cameraTag);
  if (isNotDefined(camera)) throw new Error(`Cannot execute ControlsConfigAdapter: a camera with tag "${config.cameraTag}" is not defined`);

  let result: IWriteable<IOrbitControlsParams> = {
    ...rest,
    camera,
    canvas,
    enableDamping: config.enableDamping
  };

  if (isDefined(config.target)) result = { ...result, target: Vector3Wrapper(config.target) };
  if (isDefined(config.cursor)) result = { ...result, cursor: Vector3Wrapper(config.cursor) };

  return result;
};
