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
  IToonMaterialPackKeys,
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

import type { ITexturePackParams } from './ITexturePackParams';

export type IBasicMaterialTexturePack = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexturePackParams } & IWithBasicMaterialProperty>;
export type IDepthMaterialTexturePack = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexturePackParams } & IWithDepthMaterialProperty>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexturePackParams } & IWithDistanceMaterialProperty>;
export type INormalMaterialTexturePack = Readonly<{ [key in INormalMaterialPackKeys]?: ITexturePackParams } & IWithNormalMaterialProperty>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexturePackParams } & IWithMatcapMaterialProperty>;
export type ILambertMaterialTexturePack = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexturePackParams } & IWithLambertMaterialProperty>;
export type IPhongMaterialTexturePack = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexturePackParams } & IWithPhongMaterialProperty>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexturePackParams } & IWithPhysicalMaterialProperty>;
export type IToonMaterialTexturePack = Readonly<{ [key in IToonMaterialPackKeys]?: ITexturePackParams } & IWithToonMaterialProperty>;
export type IStandardMaterialTexturePack = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexturePackParams } & IWithStandardMaterialProperty>;

export type IMaterialTexturePack =
  | IBasicMaterialTexturePack
  | IDepthMaterialTexturePack
  | IDistanceMaterialTexturePack
  | INormalMaterialTexturePack
  | IMatcapMaterialTexturePack
  | ILambertMaterialTexturePack
  | IPhongMaterialTexturePack
  | IPhysicalMaterialTexturePack
  | IToonMaterialTexturePack
  | IStandardMaterialTexturePack;
