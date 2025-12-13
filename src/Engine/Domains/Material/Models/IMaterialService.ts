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
} from '@/Engine/Domains/Texture/Models';

export type IBasicMaterialService = {
  buildMaterial: (mt: IBasicMaterialTextureUploaded) => MeshBasicMaterial;
};

export type IDepthMaterialService = {
  buildMaterial: (mt: IDepthMaterialTextureUploaded) => MeshDepthMaterial;
};

export type IDistanceMaterialService = {
  buildMaterial: (mt: IDistanceMaterialTextureUploaded) => MeshDistanceMaterial;
};

export type INormalMaterialService = {
  buildMaterial: (mt: INormalMaterialTextureUploaded) => MeshNormalMaterial;
};

export type IMatcapMaterialService = {
  buildMaterial: (mt: IMatcapMaterialTextureUploaded) => MeshMatcapMaterial;
};

export type ILambertMaterialService = {
  buildMaterial: (mt: ILambertMaterialTextureUploaded) => MeshLambertMaterial;
};

export type IPhongMaterialService = {
  buildMaterial: (mt: IPhongMaterialTextureUploaded) => MeshPhongMaterial;
};

export type IPhysicalMaterialService = {
  buildMaterial: (mt: IPhysicalMaterialTextureUploaded) => MeshPhysicalMaterial;
};

export type IToonMaterialService = {
  buildMaterial: (mt: IToonMaterialTextureUploaded) => MeshToonMaterial;
};

export type IStandardMaterialService = {
  buildMaterial: (mt: IStandardMaterialTextureUploaded) => MeshStandardMaterial;
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
