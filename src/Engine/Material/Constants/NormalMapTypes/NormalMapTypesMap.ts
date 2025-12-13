import type { NormalMapTypes } from 'three';
import { ObjectSpaceNormalMap, TangentSpaceNormalMap } from 'three';

import { NormalMapTypesName } from './NormalMapTypesName';

export const NormalMapTypesMap: Readonly<Record<NormalMapTypesName, NormalMapTypes>> = {
  [NormalMapTypesName.TangentSpaceNormalMap]: TangentSpaceNormalMap,
  [NormalMapTypesName.ObjectSpaceNormalMap]: ObjectSpaceNormalMap
};
