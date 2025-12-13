import type { ControlsType } from '@Engine/Models';
import type { CameraTag } from '@Engine/Constants';

export interface IControlsConfig {
  readonly type: ControlsType;
  readonly cameraTag: CameraTag;
}
