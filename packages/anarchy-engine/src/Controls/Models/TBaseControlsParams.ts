import type { TAnyCameraWrapper } from '@Anarchy/Engine/Camera/Models';
import type { ControlsType } from '@Anarchy/Engine/Controls/Constants';

export type TBaseControlsParams = Readonly<{
  type: ControlsType;
  camera: TAnyCameraWrapper;
}>;
