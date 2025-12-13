import { MaterialMap, MaterialType } from '@Anarchy/Engine/Material/Constants';
import type { TMaterialParams, TMaterialParamsOptions, TMaterials, TTypeOfMaterials } from '@Anarchy/Engine/Material/Models';
import type { TEulerLike, TEulerString } from '@Anarchy/Engine/ThreeLib';
import { eulerToXyz, vector2ToXy, vector3ToXyz } from '@Anarchy/Engine/Utils';
import type { TWithoutNull } from '@Anarchy/Shared/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type {
  LineDashedMaterial,
  Material,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointsMaterial,
  SpriteMaterial,
  Vector2Like,
  Vector3Like
} from 'three';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Points;
}

export function isPhysicalMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshPhysicalMaterial | T): material is MeshPhysicalMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Physical;
}

export function isLineDashedMaterial<T extends Material | ReadonlyArray<Material>>(material: LineDashedMaterial | T): material is LineDashedMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.LineDashed;
}

export function isBasicMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshBasicMaterial | T): material is MeshBasicMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Basic;
}

export function isStandardMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshStandardMaterial | T): material is MeshStandardMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Standard;
}

export function isLambertMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshLambertMaterial | T): material is MeshLambertMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Lambert;
}

export function isDepthMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshDepthMaterial | T): material is MeshDepthMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Depth;
}
export function isMatcapMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshMatcapMaterial | T): material is MeshMatcapMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Matcap;
}

export function isNodeMaterial<T extends Material | ReadonlyArray<Material>>(material: SpriteMaterial | T): material is SpriteMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Sprite;
}

export function isPhongMaterial<T extends Material | ReadonlyArray<Material>>(material: MeshPhongMaterial | T): material is MeshPhongMaterial {
  return !Array.isArray(material) && (material as Material).type === MaterialType.Phong;
}

export function buildMaterial(params: TMaterialParams): TMaterials {
  const { type, options, textures } = params;

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
