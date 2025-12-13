import type { TCameraWrapper } from '@/Engine/Camera/Models';
import type { ControlsType } from '@/Engine/Controls/Constants';

export type TBaseControlsParams = Readonly<{
  type: ControlsType;
  camera: TCameraWrapper;
}>;
