import type { NormalMapTypes } from 'three/src/constants';
import { ObjectSpaceNormalMap, TangentSpaceNormalMap } from 'three/src/constants';

import { NormalMapTypesName } from './NormalMapTypesName';

export const NormalMapTypesMap: Readonly<Record<NormalMapTypesName, NormalMapTypes>> = {
  [NormalMapTypesName.TangentSpaceNormalMap]: TangentSpaceNormalMap,
  [NormalMapTypesName.ObjectSpaceNormalMap]: ObjectSpaceNormalMap
};
