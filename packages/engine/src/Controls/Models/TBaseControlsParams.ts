import type { TAnyCameraWrapper } from '@/Camera/Models';
import type { ControlsType } from '@/Controls/Constants';

export type TBaseControlsParams = Readonly<{
  type: ControlsType;
  camera: TAnyCameraWrapper;
}>;
