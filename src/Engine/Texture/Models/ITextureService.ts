import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialPackProps,
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

export type IWithBasicMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IBasicMaterialTexturePack>) => IBasicTextureUploadPromises }>;
export type IWithDepthMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IDepthMaterialTexturePack>) => IDepthTextureUploadPromises }>;
export type IWithDistanceMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IDistanceMaterialTexturePack>) => IDistanceTextureUploadPromises }>;
export type IWithNormalMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<INormalMaterialTexturePack>) => INormalTextureUploadPromises }>;
export type IWithMatcapMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IMatcapMaterialTexturePack>) => IMatcapTextureUploadPromises }>;
export type IWithLamberMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<ILambertMaterialTexturePack>) => ILambertTextureUploadPromises }>;
export type IWithPhongMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IPhongMaterialTexturePack>) => IPhongTextureUploadPromises }>;
export type IWithPhysicalMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IPhysicalMaterialTexturePack>) => IPhysicalTextureUploadPromises }>;
export type IWithToonMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IToonMaterialTexturePack>) => IToonTextureUploadPromises }>;
export type IWithStandardMaterialTextureLoader = Readonly<{ load: (m: IMaterialPackProps<IStandardMaterialTexturePack>) => IStandardTextureUploadPromises }>;

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
