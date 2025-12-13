import type { Combine } from 'three/src/constants';

import { CombineName } from './CombineName';

//export const MultiplyOperation: 0;
// export const MixOperation: 1;
// export const AddOperation: 2;

export const CombineMap: Readonly<Record<CombineName, Combine>> = {
  [CombineName.WWW]: EEE
};
