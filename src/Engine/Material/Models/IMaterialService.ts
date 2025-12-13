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

export type IBasicMaterialService = {
  buildMaterial: (type: MaterialType, mt: IBasicTextureUploaded) => MeshBasicMaterial;
};

export type IDepthMaterialService = {
  buildMaterial: (type: MaterialType, mt: IDepthTextureUploaded) => MeshDepthMaterial;
};

export type IDistanceMaterialService = {
  buildMaterial: (type: MaterialType, mt: IDistanceTextureUploaded) => MeshDistanceMaterial;
};

export type INormalMaterialService = {
  buildMaterial: (type: MaterialType, mt: INormalTextureUploaded) => MeshNormalMaterial;
};

export type IMatcapMaterialService = {
  buildMaterial: (type: MaterialType, mt: IMatcapTextureUploaded) => MeshMatcapMaterial;
};

export type ILambertMaterialService = {
  buildMaterial: (type: MaterialType, mt: ILambertTextureUploaded) => MeshLambertMaterial;
};

export type IPhongMaterialService = {
  buildMaterial: (type: MaterialType, mt: IPhongTextureUploaded) => MeshPhongMaterial;
};

export type IPhysicalMaterialService = {
  buildMaterial: (type: MaterialType, mt: IPhysicalTextureUploaded) => MeshPhysicalMaterial;
};

export type IToonMaterialService = {
  buildMaterial: (type: MaterialType, mt: IToonTextureUploaded) => MeshToonMaterial;
};

export type IStandardMaterialService = {
  buildMaterial: (type: MaterialType, mt: IStandardTextureUploaded) => MeshStandardMaterial;
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
