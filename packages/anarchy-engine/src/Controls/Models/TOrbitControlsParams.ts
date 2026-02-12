import type { TActive, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TSpaceCanvas } from '@Anarchy/Engine/Space';
import type { Vector3 } from 'three';

import type { TBaseControlsParams } from './TBaseControlsParams';
import type { TOrbitControlsParamsOptions } from './TOrbitControlsParamsOptions';

export type TOrbitControlsParams = TBaseControlsParams &
  Readonly<{
    options?: TOrbitControlsParamsOptions;
    enabled?: boolean;
    canvas: TSpaceCanvas;
    target: Vector3;
  }> &
  TWithName &
  TActive &
  TWithTags;
