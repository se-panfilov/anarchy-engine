import type { Material, PointsMaterial } from 'three';

import type { TMaterialParams, TMaterials, TTypeOfMaterials } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material/Constants';
import { isNotDefined } from '@/Engine/Utils';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === 'PointsMaterial';
}

export function buildMaterial(params: TMaterialParams): TMaterials {
  const { type, options } = params;
  const MaterialConstructor: TTypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  return new MaterialConstructor(options);
}
