import type { CameraTag } from '@Engine/Domains/Camera';
import type { ControlsTag, IControlsType } from '@Engine/Domains/Controls';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  tags: ReadonlyArray<ControlsTag>;
}>;
