import type { CameraTag } from '@Engine/Domains/Camera';

import type { ControlsTag } from '../Constants';
import type { IControlsType } from './IControlsType';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  enableDamping?: boolean;
  tags: ReadonlyArray<ControlsTag>;
}>;
