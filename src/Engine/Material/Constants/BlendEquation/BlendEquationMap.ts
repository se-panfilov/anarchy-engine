import type { BlendingEquation } from 'three';
import { AddEquation, MaxEquation, MinEquation, ReverseSubtractEquation, SubtractEquation } from 'three';

import { BlendEquationName } from './BlendEquationName';

export const BlendEquationMap: Readonly<Record<BlendEquationName, BlendingEquation>> = {
  [BlendEquationName.AddEquation]: AddEquation,
  [BlendEquationName.MaxEquation]: MaxEquation,
  [BlendEquationName.MinEquation]: MinEquation,
  [BlendEquationName.ReverseSubtractEquation]: ReverseSubtractEquation,
  [BlendEquationName.SubtractEquation]: SubtractEquation
};
