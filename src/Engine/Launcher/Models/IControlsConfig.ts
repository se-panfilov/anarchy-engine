import type { CameraTag } from '@Engine/Constants';
import type { ControlsType } from '@Engine/Models';

export type IControlsConfig = Readonly<{
  type: ControlsType;
  cameraTag: CameraTag;
}>;
