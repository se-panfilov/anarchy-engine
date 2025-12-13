import type { Blending } from 'three';
import { AdditiveBlending, CustomBlending, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending } from 'three';

import { BlendingName } from './BlendingName';

export const BlendingMap: Readonly<Record<BlendingName, Blending>> = {
  [BlendingName.Additive]: AdditiveBlending,
  [BlendingName.Custom]: CustomBlending,
  [BlendingName.Multiply]: MultiplyBlending,
  [BlendingName.None]: NoBlending,
  [BlendingName.Normal]: NormalBlending,
  [BlendingName.Subtractive]: SubtractiveBlending
};
