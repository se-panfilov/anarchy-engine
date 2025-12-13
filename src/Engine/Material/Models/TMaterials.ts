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
  MeshToonMaterial,
  PointsMaterial
} from 'three';

export type TMaterials =
  | MeshBasicMaterial
  | MeshDepthMaterial
  | MeshDistanceMaterial
  | MeshLambertMaterial
  | MeshMatcapMaterial
  | MeshNormalMaterial
  | MeshPhongMaterial
  | MeshPhysicalMaterial
  | MeshStandardMaterial
  | MeshToonMaterial
  | PointsMaterial;

export type TTypeOfMaterials =
  | typeof MeshBasicMaterial
  | typeof MeshDepthMaterial
  | typeof MeshDistanceMaterial
  | typeof MeshLambertMaterial
  | typeof MeshMatcapMaterial
  | typeof MeshNormalMaterial
  | typeof MeshPhongMaterial
  | typeof MeshPhysicalMaterial
  | typeof MeshStandardMaterial
  | typeof MeshToonMaterial
  | typeof PointsMaterial;
