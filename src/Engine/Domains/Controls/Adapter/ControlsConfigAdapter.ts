import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { isNotDefined } from '@Engine/Utils';

import type { IControlsConfig, IControlsParams } from '../Models';
import { IControlsType } from '../Models';

export function fromConfig(config: IControlsConfig, cameraRegistry: ICameraRegistry, canvas: IAppCanvas): IControlsParams {
  const { type, cameraTag, tags } = config;

  if (type !== IControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${type as string}"`);
  if (isNotDefined(cameraTag)) throw new Error(`Cannot attach controls ("${type}") to undefined camera tag`);

  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(cameraTag);
  if (isNotDefined(camera)) throw new Error(`Cannot execute ControlsConfigAdapter: a camera with tag "${cameraTag}" is not defined`);

  return {
    camera,
    canvas,
    tags
  };
}
