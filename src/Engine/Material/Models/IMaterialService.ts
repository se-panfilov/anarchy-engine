import type {
  Material,
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
  IMaterialTexturePack,
  INormalTextureUploaded,
  IPhongTextureUploaded,
  IPhysicalTextureUploaded,
  IPointsTextureUploaded,
  IStandardTextureUploaded,
  IToonTextureUploaded
} from '@/Engine/Texture/Models';

import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialProps } from './IMaterialProps';

type IAbstractMaterialService = Readonly<{
  buildMaterialWithTextures: (material: IMaterialProps<IMaterialTexturePack>) => Promise<Material>;
}>;

export type IBasicMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded) => MeshBasicMaterial;
  }>;

export type IDepthMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded) => MeshDepthMaterial;
  }>;

export type IDistanceMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded) => MeshDistanceMaterial;
  }>;

export type INormalMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded) => MeshNormalMaterial;
  }>;

export type IMatcapMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded) => MeshMatcapMaterial;
  }>;

export type ILambertMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded) => MeshLambertMaterial;
  }>;

export type IPhongMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded) => MeshPhongMaterial;
  }>;

export type IPhysicalMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded) => MeshPhysicalMaterial;
  }>;

export type IToonMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded) => MeshToonMaterial;
  }>;

export type IStandardMaterialService = IAbstractMaterialService &
  Readonly<{
    buildMaterial: (type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded) => MeshStandardMaterial;
  }>;

export type IPointsMaterialService = IAbstractMaterialService &
  Readonly<{
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
