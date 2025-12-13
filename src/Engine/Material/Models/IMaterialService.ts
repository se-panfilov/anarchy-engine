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
  IStandardTextureUploaded,
  IToonTextureUploaded
} from '@/Engine/Texture/Models';

import type { IMaterialParams } from './IMaterialParams';

export type IBasicMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded) => MeshBasicMaterial;
};

export type IDepthMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded) => MeshDepthMaterial;
};

export type IDistanceMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded) => MeshDistanceMaterial;
};

export type INormalMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded) => MeshNormalMaterial;
};

export type IMatcapMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded) => MeshMatcapMaterial;
};

export type ILambertMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded) => MeshLambertMaterial;
};

export type IPhongMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded) => MeshPhongMaterial;
};

export type IPhysicalMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded) => MeshPhysicalMaterial;
};

export type IToonMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded) => MeshToonMaterial;
};

export type IStandardMaterialService = {
  buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded) => MeshStandardMaterial;
};

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
  | IToonMaterialService;
