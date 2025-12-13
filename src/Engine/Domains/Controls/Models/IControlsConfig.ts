import type { CameraTag } from '@Engine/Domains/Camera/Constants';
import type { ControlsTag } from '@Engine/Domains/Controls/Constants';
import type { IControlsType } from '@Engine/Domains/Controls/Models';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  tags: ReadonlyArray<ControlsTag>;
}>;
