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
  MeshToonMaterial,
  PointsMaterial
} from 'three';

import type { TTypeOfMaterials } from '@/Engine/Material/Models';

import { MaterialType } from './MaterialType';

export const MaterialMap: Readonly<Record<MaterialType, TTypeOfMaterials>> = {
  [MaterialType.Basic]: MeshBasicMaterial,
  [MaterialType.Depth]: MeshDepthMaterial,
  [MaterialType.Distance]: MeshDistanceMaterial,
  [MaterialType.Normal]: MeshNormalMaterial,
  [MaterialType.Matcap]: MeshMatcapMaterial,
  [MaterialType.Lambert]: MeshLambertMaterial,
  [MaterialType.Phong]: MeshPhongMaterial,
  [MaterialType.Physical]: MeshPhysicalMaterial,
  [MaterialType.Toon]: MeshToonMaterial,
  [MaterialType.Standard]: MeshStandardMaterial,
  [MaterialType.Points]: PointsMaterial
};
