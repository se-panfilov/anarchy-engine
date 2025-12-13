import { AdditiveBlending, CustomBlending, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending } from 'three';
import type { Blending } from 'three/src/constants';

import { BlendingName } from './BlendingName';

export const BlendingMap: Readonly<Record<BlendingName, Blending>> = {
  [BlendingName.Normal]: NormalBlending,
  [BlendingName.Additive]: AdditiveBlending,
  [BlendingName.Subtractive]: SubtractiveBlending,
  [BlendingName.Multiply]: MultiplyBlending,
  [BlendingName.Custom]: CustomBlending,
  [BlendingName.None]: NoBlending
};
