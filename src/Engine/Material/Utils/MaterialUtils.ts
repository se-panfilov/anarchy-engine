import type { Material, PointsMaterial } from 'three';

import type { TMaterialParams, TMaterials, TTypeOfMaterials } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material/Constants';
import { isNotDefined } from '@/Engine/Utils';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === 'PointsMaterial';
}

export function buildMaterial(params: TMaterialParams): TMaterials {
  const { type, options, textures } = params;

  const MaterialConstructor: TTypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  return new MaterialConstructor({ ...options, ...textures });
}

export function getOptionName<T extends string, V>(option: V, optionsMap: Readonly<Record<T, V>>, name: string): T | never {
  const blendingName: T | undefined = Object.entries(optionsMap).find(([, value]: [string, unknown]): boolean => value === option)?.[0] as T | undefined;
  if (!blendingName) throw new Error(`Cannot get option name of material's option "${name}": Unsupported option "${option}". Possible options: ${Object.values(optionsMap).join(', ')}`);
  return blendingName;
}
