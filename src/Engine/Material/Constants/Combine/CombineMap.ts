import type { Combine } from 'three/src/constants';
import { AddOperation, MixOperation, MultiplyOperation } from 'three/src/constants';

import { CombineName } from './CombineName';

export const CombineMap: Readonly<Record<CombineName, Combine>> = {
  [CombineName.MultiplyOperation]: MultiplyOperation,
  [CombineName.MixOperation]: MixOperation,
  [CombineName.AddOperation]: AddOperation
};
