import type { IMaterialProps } from '@/Engine/Material/Models';

import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from './IMaterialTexturePack';
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

export type IWithBasicMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IBasicMaterialTexturePack>) => IBasicTextureUploadPromises }>;
export type IWithDepthMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IDepthMaterialTexturePack>) => IDepthTextureUploadPromises }>;
export type IWithDistanceMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IDistanceMaterialTexturePack>) => IDistanceTextureUploadPromises }>;
export type IWithNormalMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<INormalMaterialTexturePack>) => INormalTextureUploadPromises }>;
export type IWithMatcapMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IMatcapMaterialTexturePack>) => IMatcapTextureUploadPromises }>;
export type IWithLamberMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<ILambertMaterialTexturePack>) => ILambertTextureUploadPromises }>;
export type IWithPhongMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IPhongMaterialTexturePack>) => IPhongTextureUploadPromises }>;
export type IWithPhysicalMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IPhysicalMaterialTexturePack>) => IPhysicalTextureUploadPromises }>;
export type IWithToonMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IToonMaterialTexturePack>) => IToonTextureUploadPromises }>;
export type IWithStandardMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IStandardMaterialTexturePack>) => IStandardTextureUploadPromises }>;

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
