import type { BlendingEquation } from 'three';
import { AddEquation, MaxEquation, MinEquation, ReverseSubtractEquation, SubtractEquation } from 'three';

import { BlendEquationName } from './BlendEquationName';

export const BlendEquationMap: Readonly<Record<BlendEquationName, BlendingEquation>> = {
  [BlendEquationName.AddEquation]: AddEquation,
  [BlendEquationName.SubtractEquation]: SubtractEquation,
  [BlendEquationName.ReverseSubtractEquation]: ReverseSubtractEquation,
  [BlendEquationName.MinEquation]: MinEquation,
  [BlendEquationName.MaxEquation]: MaxEquation
};
