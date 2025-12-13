import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSpaceCanvas } from '@/Engine/Space';

import type { TBaseControlsParams } from './TBaseControlsParams';

export type TFpsControlsParams = TBaseControlsParams &
  Readonly<{
    movementSpeed?: number;
    lookSpeed?: number;
    lookVertical?: boolean;
    autoForward?: boolean;
    activeLook?: boolean;
    heightSpeed?: boolean;
    heightCoef?: number;
    heightMin?: number;
    heightMax?: number;
    constrainVertical?: boolean;
    verticalMin?: number;
    verticalMax?: number;
    mouseDragOn?: boolean;
    canvas: TSpaceCanvas;
  }> &
  TWithName &
  TActive &
  TWithTags;
