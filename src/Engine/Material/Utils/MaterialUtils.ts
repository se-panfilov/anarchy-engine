import type { Material, PointsMaterial, Vector2Like, Vector3Like } from 'three';

import type { TMaterialParams, TMaterialParamsOptions, TMaterials, TTypeOfMaterials } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material/Constants';
import type { TEulerLike, TEulerString } from '@/Engine/ThreeLib';
import type { TWithoutNull } from '@/Engine/Utils';
import { eulerToXyz, isNotDefined, vector2ToXy, vector3ToXyz } from '@/Engine/Utils';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === 'PointsMaterial';
}

export function buildMaterial(params: TMaterialParams): TMaterials {
  const { type, options, textures } = params;

  if (params.name === 'physical_metal') {
    console.log('XXX5 IOR', (options as any).ior);
  }

  const MaterialConstructor: TTypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  return new MaterialConstructor({ ...(options as TWithoutNull<TMaterialParamsOptions>), ...textures });
}

export function getOptionName<T extends string, V>(option: V, optionsMap: Readonly<Record<T, V>>, name: string): T | never {
  const optionName: T | undefined = Object.entries(optionsMap).find(([, value]: [string, unknown]): boolean => value === option)?.[0] as T | undefined;
  if (!optionName) throw new Error(`Cannot get option name of material's option "${name}": Unsupported option "${option}". Possible options: ${Object.values(optionsMap).join(', ')}`);
  return optionName;
}

export function getOptionNameIfPossible<T extends string, V>(option: V | undefined, optionsMap: Readonly<Record<T, V>>, name: string): T | undefined {
  if (option === undefined) return undefined;
  return getOptionName(option, optionsMap, name);
}

export function vector2ToXyIfPossible(vector: Vector2Like | undefined): Readonly<{ x: number; y: number }> {
  if (isNotDefined(vector)) return { x: 0, y: 0 };
  return vector2ToXy(vector);
}

export function vector3ToXyzIfPossible(vector: Vector3Like | undefined): Readonly<{ x: number; y: number; z: number }> {
  if (isNotDefined(vector)) return { x: 0, y: 0, z: 0 };
  return vector3ToXyz(vector);
}

export function eulerToXyzIfPossible(euler: TEulerLike | TEulerString | undefined): Readonly<{
  x: number;
  y: number;
  z: number;
  order?: 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
}> {
  if (isNotDefined(euler)) return { x: 0, y: 0, z: 0 };
  return eulerToXyz(euler);
}
