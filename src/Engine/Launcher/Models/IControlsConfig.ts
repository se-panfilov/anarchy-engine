import type { CameraTag, ControlsTag } from '@Engine/Constants';
import type { IControlsType } from '@Engine/Models';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  tags: ReadonlyArray<ControlsTag>;
}>;
