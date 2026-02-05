import type { TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera/Models';
import type { ControlsType } from '@hellpig/anarchy-engine/Controls/Constants';

export type TBaseControlsParams = Readonly<{
  type: ControlsType;
  camera: TAnyCameraWrapper;
}>;
