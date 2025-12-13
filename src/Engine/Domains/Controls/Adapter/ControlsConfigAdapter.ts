import type { ICameraWrapper } from '@Engine/Domains/Camera';
import { isNotDefined } from '@Engine/Utils';

import type { IGetParamsFn } from '@/Engine/Domains/Abstract';
import type { IAdditionalControlsConfigParams, IControlsConfig, IControlsParams } from '@/Engine/Domains/Controls/Models';
import { IControlsType } from '@/Engine/Domains/Controls/Models';

export const getParams: IGetParamsFn<IControlsParams, IControlsConfig> = (config: IControlsConfig, { cameraRegistry, canvas }: IAdditionalControlsConfigParams): IControlsParams => {
  const { type, cameraTag, tags } = config;

  if (type !== IControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${type as string}"`);
  if (isNotDefined(cameraTag)) throw new Error(`Cannot attach controls ("${type}") to undefined camera tag`);

  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(cameraTag);
  if (isNotDefined(camera)) throw new Error(`Cannot execute ControlsConfigAdapter: a camera with tag "${cameraTag}" is not defined`);

  return {
    camera,
    canvas,
    enableDamping: config.enableDamping,
    tags
  };
};
