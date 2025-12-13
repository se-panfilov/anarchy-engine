import type { Combine } from 'three';
import { AddOperation, MixOperation, MultiplyOperation } from 'three';

import { CombineName } from './CombineName';

export const CombineMap: Readonly<Record<CombineName, Combine>> = {
  [CombineName.AddOperation]: AddOperation,
  [CombineName.MixOperation]: MixOperation,
  [CombineName.MultiplyOperation]: MultiplyOperation
};
