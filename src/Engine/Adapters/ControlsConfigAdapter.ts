import type { IControlsParams } from '@Engine/Models';
import type { IControlsConfig } from '@Engine/Launcher/Models';
import { ControlsType } from '@Engine/Models';

export function controlsAdapter(config: IControlsConfig): IControlsParams {
  const { type, cameraTag } = config;

  if (type !== ControlsType.OrbitControls) throw new Error(`Cannot create controls of unknown type "${type}"`);

  // TODO (S.Panfilov) CWP fix the creation of controls

  return {
    camera: cameraRegistry.getByTag(cameraTag)
  };
}
