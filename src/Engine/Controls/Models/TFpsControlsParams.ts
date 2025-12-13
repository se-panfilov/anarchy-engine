import type { TAppCanvas } from '@/Engine/App';
import type { TActive, TWithNameOptional, TWithTags } from '@/Engine/Mixins';

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
    canvas: TAppCanvas;
  }> &
  TWithNameOptional &
  TActive &
  TWithTags;
