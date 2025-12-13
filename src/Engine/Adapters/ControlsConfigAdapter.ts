import type { IAppCanvas, IControlsParams } from '@Engine/Models';
import { ControlsType } from '@Engine/Models';
import type { IControlsConfig } from '@Engine/Launcher/Models';
import type { ICameraRegistry } from '@Engine/Registries';
import { isNotDefined } from '@Engine/Utils';

export function controlsAdapter(
  config: IControlsConfig,
  cameraRegistry: ICameraRegistry,
  canvas: IAppCanvas
): IControlsParams {
  const { type, cameraTag } = config;

  if (type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${type}"`);
  if (isNotDefined(cameraTag)) throw new Error(`Cannot attach controls ("${type}") to undefined camera tag`);

  // TODO (S.Panfilov) CWP "cameraRegistry.getByTag(cameraTag)" doesn't work, because camera is not yet created. Fix this

  return {
    camera: cameraRegistry.getByTag(cameraTag),
    canvas
  };
}
