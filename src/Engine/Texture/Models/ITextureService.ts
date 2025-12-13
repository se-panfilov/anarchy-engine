import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  TMaterialPackParams,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack/Models';

import type {
  IBasicTextureUploadPromises,
  IDepthTextureUploadPromises,
  IDistanceTextureUploadPromises,
  ILambertTextureUploadPromises,
  IMatcapTextureUploadPromises,
  INormalTextureUploadPromises,
  IPhongTextureUploadPromises,
  IPhysicalTextureUploadPromises,
  IStandardTextureUploadPromises,
  IToonTextureUploadPromises
} from './ITextureUploadPromises';

export type IWithBasicMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IBasicMaterialTexturePack>) => IBasicTextureUploadPromises }>;
export type IWithDepthMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IDepthMaterialTexturePack>) => IDepthTextureUploadPromises }>;
export type IWithDistanceMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IDistanceMaterialTexturePack>) => IDistanceTextureUploadPromises }>;
export type IWithNormalMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<INormalMaterialTexturePack>) => INormalTextureUploadPromises }>;
export type IWithMatcapMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IMatcapMaterialTexturePack>) => IMatcapTextureUploadPromises }>;
export type IWithLamberMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<ILambertMaterialTexturePack>) => ILambertTextureUploadPromises }>;
export type IWithPhongMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IPhongMaterialTexturePack>) => IPhongTextureUploadPromises }>;
export type IWithPhysicalMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IPhysicalMaterialTexturePack>) => IPhysicalTextureUploadPromises }>;
export type IWithToonMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IToonMaterialTexturePack>) => IToonTextureUploadPromises }>;
export type IWithStandardMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<IStandardMaterialTexturePack>) => IStandardTextureUploadPromises }>;

export type IBasicMaterialTextureService = IWithBasicMaterialTextureLoader;
export type IDepthMaterialTextureService = IWithDepthMaterialTextureLoader;
export type IDistanceMaterialTextureService = IWithDistanceMaterialTextureLoader;
export type INormalMaterialTextureService = IWithNormalMaterialTextureLoader;
export type IMatcapMaterialTextureService = IWithMatcapMaterialTextureLoader;
export type ILamberMaterialTextureService = IWithLamberMaterialTextureLoader;
export type IPhongMaterialTextureService = IWithPhongMaterialTextureLoader;
export type IPhysicalMaterialTextureService = IWithPhysicalMaterialTextureLoader;
export type IToonMaterialTextureService = IWithToonMaterialTextureLoader;
export type IStandardMaterialTextureService = IWithStandardMaterialTextureLoader;

export type ITextureService =
  | IBasicMaterialTextureService
  | IDepthMaterialTextureService
  | IDistanceMaterialTextureService
  | INormalMaterialTextureService
  | IMatcapMaterialTextureService
  | ILamberMaterialTextureService
  | IPhongMaterialTextureService
  | IPhysicalMaterialTextureService
  | IToonMaterialTextureService
  | IStandardMaterialTextureService;
