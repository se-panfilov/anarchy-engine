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

import type { MaterialType } from '@/Engine/Material/Constants';
import type {
  IBasicTextureUploaded,
  IDepthTextureUploaded,
  IDistanceTextureUploaded,
  ILambertTextureUploaded,
  IMatcapTextureUploaded,
  INormalTextureUploaded,
  IPhongTextureUploaded,
  IPhysicalTextureUploaded,
  IPointsTextureUploaded,
  IStandardTextureUploaded,
  IToonTextureUploaded
} from '@/Engine/Texture/Models';

import type { IMaterialParams } from './IMaterialParams';

export type IBasicMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded) => MeshBasicMaterial;
}>;

export type IDepthMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded) => MeshDepthMaterial;
}>;

export type IDistanceMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded) => MeshDistanceMaterial;
}>;

export type INormalMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded) => MeshNormalMaterial;
}>;

export type IMatcapMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded) => MeshMatcapMaterial;
}>;

export type ILambertMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded) => MeshLambertMaterial;
}>;

export type IPhongMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded) => MeshPhongMaterial;
}>;

export type IPhysicalMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded) => MeshPhysicalMaterial;
}>;

export type IToonMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded) => MeshToonMaterial;
}>;

export type IStandardMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded) => MeshStandardMaterial;
}>;

export type IPointsMaterialService = Readonly<{
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPointsTextureUploaded) => PointsMaterial;
}>;

export type IMaterialService =
  | IBasicMaterialService
  | IDepthMaterialService
  | IDistanceMaterialService
  | INormalMaterialService
  | IMatcapMaterialService
  | ILambertMaterialService
  | IPhongMaterialService
  | IPhysicalMaterialService
  | IStandardMaterialService
  | IToonMaterialService
  | IPointsMaterialService;
