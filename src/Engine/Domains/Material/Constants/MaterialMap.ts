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

import { MaterialType } from '@/Engine/Domains/Material';

export const MaterialMap = {
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
