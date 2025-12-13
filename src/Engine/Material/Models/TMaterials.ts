import type {
  LineBasicMaterial,
  LineDashedMaterial,
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
  PointsMaterial,
  RawShaderMaterial,
  ShaderMaterial,
  ShadowMaterial,
  SpriteMaterial
} from 'three';

export type TMaterials =
  | LineBasicMaterial
  | LineDashedMaterial
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
  | PointsMaterial
  | RawShaderMaterial
  | ShaderMaterial
  | ShadowMaterial
  | SpriteMaterial;

export type TTypeOfMaterials =
  | typeof LineBasicMaterial
  | typeof LineDashedMaterial
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
  | typeof PointsMaterial
  | typeof RawShaderMaterial
  | typeof ShaderMaterial
  | typeof ShadowMaterial
  | typeof SpriteMaterial;
