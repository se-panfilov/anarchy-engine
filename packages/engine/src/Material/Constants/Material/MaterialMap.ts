import type { TTypeOfMaterials } from '@Engine/Material/Models';
import {
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

import { MaterialType } from './MaterialType';

export const MaterialMap: Readonly<Record<MaterialType, TTypeOfMaterials>> = {
  [MaterialType.Basic]: MeshBasicMaterial,
  [MaterialType.Depth]: MeshDepthMaterial,
  [MaterialType.Distance]: MeshDistanceMaterial,
  [MaterialType.Lambert]: MeshLambertMaterial,
  [MaterialType.LineBasic]: LineBasicMaterial,
  [MaterialType.LineDashed]: LineDashedMaterial,
  [MaterialType.Matcap]: MeshMatcapMaterial,
  [MaterialType.Normal]: MeshNormalMaterial,
  [MaterialType.Phong]: MeshPhongMaterial,
  [MaterialType.Physical]: MeshPhysicalMaterial,
  [MaterialType.Points]: PointsMaterial,
  [MaterialType.RawShader]: RawShaderMaterial,
  [MaterialType.Shader]: ShaderMaterial,
  [MaterialType.Shadow]: ShadowMaterial,
  [MaterialType.Sprite]: SpriteMaterial,
  [MaterialType.Standard]: MeshStandardMaterial,
  [MaterialType.Toon]: MeshToonMaterial
};
