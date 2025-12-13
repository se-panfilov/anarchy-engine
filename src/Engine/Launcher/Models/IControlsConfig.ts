import type { CameraTag, ControlsTag } from '@Engine/Constants';
import type { ControlsType } from '@Engine/Models';

export type IControlsConfig = Readonly<{
  type: ControlsType;
  cameraTag: CameraTag;
  tags: ReadonlyArray<ControlsTag>;
}>;
