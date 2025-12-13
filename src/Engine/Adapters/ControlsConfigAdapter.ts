import type { IAppCanvas, IControlsConfig, IControlsParams } from '@Engine/Models';
import { IControlsType } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Registries';
import { isNotDefined } from '@Engine/Utils';
import type { ICameraWrapper } from '@Engine/Wrappers';

export function controlsAdapter(config: IControlsConfig, cameraRegistry: ICameraRegistry, canvas: IAppCanvas): IControlsParams {
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
