import type { ControlsType } from '@Engine/Models';
import type { CameraTag } from '@Engine/Constants';

export type IControlsConfig = Readonly<{
  type: ControlsType;
  cameraTag: CameraTag;
}>;
