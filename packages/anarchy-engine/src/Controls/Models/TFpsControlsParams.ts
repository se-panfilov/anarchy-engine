import type { TActive, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TSpaceCanvas } from '@hellpig/anarchy-engine/Space';

import type { TBaseControlsParams } from './TBaseControlsParams';
import type { TFpsControlsParamsOptions } from './TFpsControlsParamsOptions';

export type TFpsControlsParams = TBaseControlsParams &
  Readonly<{
    options?: TFpsControlsParamsOptions;
    enabled?: boolean;
    canvas: TSpaceCanvas;
  }> &
  TWithName &
  TActive &
  TWithTags;
