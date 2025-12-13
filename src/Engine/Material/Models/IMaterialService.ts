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
  IBasicMaterialTextureUploaded,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTextureUploaded,
  ILambertMaterialTextureUploaded,
  IMatcapMaterialTextureUploaded,
  INormalMaterialTextureUploaded,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTextureUploaded,
  IToonMaterialTextureUploaded
} from '@/Engine/Texture/Models';

export type IBasicMaterialService = {
  buildMaterial: (type: MaterialType, mt: IBasicMaterialTextureUploaded) => MeshBasicMaterial;
};

export type IDepthMaterialService = {
  buildMaterial: (type: MaterialType, mt: IDepthMaterialTextureUploaded) => MeshDepthMaterial;
};

export type IDistanceMaterialService = {
  buildMaterial: (type: MaterialType, mt: IDistanceMaterialTextureUploaded) => MeshDistanceMaterial;
};

export type INormalMaterialService = {
  buildMaterial: (type: MaterialType, mt: INormalMaterialTextureUploaded) => MeshNormalMaterial;
};

export type IMatcapMaterialService = {
  buildMaterial: (type: MaterialType, mt: IMatcapMaterialTextureUploaded) => MeshMatcapMaterial;
};

export type ILambertMaterialService = {
  buildMaterial: (type: MaterialType, mt: ILambertMaterialTextureUploaded) => MeshLambertMaterial;
};

export type IPhongMaterialService = {
  buildMaterial: (type: MaterialType, mt: IPhongMaterialTextureUploaded) => MeshPhongMaterial;
};

export type IPhysicalMaterialService = {
  buildMaterial: (type: MaterialType, mt: IPhysicalMaterialTextureUploaded) => MeshPhysicalMaterial;
};

export type IToonMaterialService = {
  buildMaterial: (type: MaterialType, mt: IToonMaterialTextureUploaded) => MeshToonMaterial;
};

export type IStandardMaterialService = {
  buildMaterial: (type: MaterialType, mt: IStandardMaterialTextureUploaded) => MeshStandardMaterial;
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
