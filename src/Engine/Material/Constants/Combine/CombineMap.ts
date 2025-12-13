import type { Combine } from 'three';
import { AddOperation, MixOperation, MultiplyOperation } from 'three';

import { CombineName } from './CombineName';

export const CombineMap: Readonly<Record<CombineName, Combine>> = {
  [CombineName.MultiplyOperation]: MultiplyOperation,
  [CombineName.MixOperation]: MixOperation,
  [CombineName.AddOperation]: AddOperation
};
