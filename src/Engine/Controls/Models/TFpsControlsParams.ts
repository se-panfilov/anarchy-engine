import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSpaceCanvas } from '@/Engine/Space';

import type { TBaseControlsParams } from './TBaseControlsParams';
import type { TFpsControlsParamsOptions } from './TFpsControlsParamsOptions';

export type TFpsControlsParams = TBaseControlsParams &
  Readonly<{
    options?: TFpsControlsParamsOptions;
    canvas: TSpaceCanvas;
  }> &
  TWithName &
  TActive &
  TWithTags;
