import type { ControlsType } from '@Engine/Models';

export interface IControlsConfig {
  readonly type: ControlsType;
  readonly cameraTag?: string;
}
