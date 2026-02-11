import type { TActive, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TSpaceCanvas } from '@Anarchy/Engine/Space';

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
