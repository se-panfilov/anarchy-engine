import type {
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

export type IMaterials =
  | MeshBasicMaterial
  | MeshDepthMaterial
  | MeshDistanceMaterial
  | MeshLambertMaterial
  | MeshMatcapMaterial
  | MeshNormalMaterial
  | MeshPhongMaterial
  | MeshPhysicalMaterial
  | MeshStandardMaterial
  | MeshToonMaterial;
export type ITypeOfMaterials =
  | typeof MeshBasicMaterial
  | typeof MeshDepthMaterial
  | typeof MeshDistanceMaterial
  | typeof MeshLambertMaterial
  | typeof MeshMatcapMaterial
  | typeof MeshNormalMaterial
  | typeof MeshPhongMaterial
  | typeof MeshPhysicalMaterial
  | typeof MeshStandardMaterial
  | typeof MeshToonMaterial;
