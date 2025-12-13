import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSpaceCanvas } from '@/Engine/Space';

import type { TBaseControlsParams } from './TBaseControlsParams';
import type { TOrbitControlsParamsOptions } from './TOrbitControlsParamsOptions';

export type TOrbitControlsParams = TBaseControlsParams &
  Readonly<{
    options?: TOrbitControlsParamsOptions;
    enabled?: boolean;
    canvas: TSpaceCanvas;
  }> &
  TWithName &
  TActive &
  TWithTags;
