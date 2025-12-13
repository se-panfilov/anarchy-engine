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
  [MaterialType.Lambert]: MeshLambertMaterial,
  [MaterialType.Matcap]: MeshMatcapMaterial,
  [MaterialType.Normal]: MeshNormalMaterial,
  [MaterialType.Phong]: MeshPhongMaterial,
  [MaterialType.Physical]: MeshPhysicalMaterial,
  [MaterialType.Points]: PointsMaterial,
  [MaterialType.Standard]: MeshStandardMaterial,
  [MaterialType.Toon]: MeshToonMaterial
};
