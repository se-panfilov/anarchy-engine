import {
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial
} from 'three';

import type { ITypeOfMaterials } from '@/Engine/Material/Models';

import { MaterialType } from './MaterialType';

export const MaterialMap: Readonly<Record<MaterialType, ITypeOfMaterials>> = {
  [MaterialType.Basic]: MeshBasicMaterial,
  [MaterialType.Depth]: MeshDepthMaterial,
  [MaterialType.Distance]: MeshDistanceMaterial,
  [MaterialType.Normal]: MeshNormalMaterial,
  [MaterialType.Matcap]: MeshMatcapMaterial,
  [MaterialType.Lambert]: MeshLambertMaterial,
  [MaterialType.Phong]: MeshPhongMaterial,
  [MaterialType.Physical]: MeshPhysicalMaterial,
  [MaterialType.Toon]: MeshToonMaterial,
  [MaterialType.Standard]: MeshStandardMaterial
};
