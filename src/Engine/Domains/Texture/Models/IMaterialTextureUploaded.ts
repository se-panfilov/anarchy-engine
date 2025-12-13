import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILambertMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from './IMaterialPackKeys.ts';
import type { ITexture } from './ITexture';
import type {
  IWithBasicMaterialProperty,
  IWithDepthMaterialProperty,
  IWithDistanceMaterialProperty,
  IWithLambertMaterialProperty,
  IWithMatcapMaterialProperty,
  IWithNormalMaterialProperty,
  IWithPhongMaterialProperty,
  IWithPhysicalMaterialProperty,
  IWithStandardMaterialProperty,
  IWithToonMaterialProperty
} from '@/Engine/Domains/Material';

export type IBasicMaterialTextureUploaded = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexture } & IWithBasicMaterialProperty>;
export type IDepthMaterialTextureUploaded = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexture }> & IWithDepthMaterialProperty;
export type IDistanceMaterialTextureUploaded = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexture } & IWithDistanceMaterialProperty>;
export type INormalMaterialTextureUploaded = Readonly<{ [key in INormalMaterialPackKeys]?: ITexture } & IWithNormalMaterialProperty>;
export type IMatcapMaterialTextureUploaded = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexture } & IWithMatcapMaterialProperty>;
export type ILambertMaterialTextureUploaded = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexture } & IWithLambertMaterialProperty>;
export type IPhongMaterialTextureUploaded = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexture } & IWithPhongMaterialProperty>;
export type IPhysicalMaterialTextureUploaded = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexture } & IWithPhysicalMaterialProperty>;
export type IToonMaterialTextureUploaded = Readonly<{ [key in IToonMaterialPackKeys]?: ITexture } & IWithToonMaterialProperty>;
export type IStandardMaterialTextureUploaded = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexture } & IWithStandardMaterialProperty>;

export type IMaterialTextureUploaded =
  | IBasicMaterialTextureUploaded
  | IDepthMaterialTextureUploaded
  | IDistanceMaterialTextureUploaded
  | INormalMaterialTextureUploaded
  | IMatcapMaterialTextureUploaded
  | ILambertMaterialTextureUploaded
  | IPhongMaterialTextureUploaded
  | IPhysicalMaterialTextureUploaded
  | IToonMaterialTextureUploaded
  | IStandardMaterialTextureUploaded;
