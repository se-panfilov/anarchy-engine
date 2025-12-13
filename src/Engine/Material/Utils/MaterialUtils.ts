import type { Material, PointsMaterial } from 'three';

import type { IMaterialParams, IMaterials, ITypeOfMaterials } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material/Constants';
import { isNotDefined } from '@/Engine/Utils';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === 'PointsMaterial';
}

export function buildMaterial(params: IMaterialParams): IMaterials {
  const { type, ...rest } = params;
  const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  return new MaterialConstructor({ ...rest });
}
