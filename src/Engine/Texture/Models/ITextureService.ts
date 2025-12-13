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
  IBasicMaterialTextureUploadPromises,
  IDepthMaterialTextureUploadPromises,
  IDistanceMaterialTextureUploadPromises,
  ILambertMaterialTextureUploadPromises,
  IMatcapMaterialTextureUploadPromises,
  INormalMaterialTextureUploadPromises,
  IPhongMaterialTextureUploadPromises,
  IPhysicalMaterialTextureUploadPromises,
  IStandardMaterialTextureUploadPromises,
  IToonMaterialTextureUploadPromises
} from './IMaterialTextureUploadPromises';

export type IWithBasicMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IBasicMaterialTexturePack>) => IBasicMaterialTextureUploadPromises }>;
export type IWithDepthMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IDepthMaterialTexturePack>) => IDepthMaterialTextureUploadPromises }>;
export type IWithDistanceMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IDistanceMaterialTexturePack>) => IDistanceMaterialTextureUploadPromises }>;
export type IWithNormalMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<INormalMaterialTexturePack>) => INormalMaterialTextureUploadPromises }>;
export type IWithMatcapMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IMatcapMaterialTexturePack>) => IMatcapMaterialTextureUploadPromises }>;
export type IWithLamberMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<ILambertMaterialTexturePack>) => ILambertMaterialTextureUploadPromises }>;
export type IWithPhongMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IPhongMaterialTexturePack>) => IPhongMaterialTextureUploadPromises }>;
export type IWithPhysicalMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IPhysicalMaterialTexturePack>) => IPhysicalMaterialTextureUploadPromises }>;
export type IWithToonMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IToonMaterialTexturePack>) => IToonMaterialTextureUploadPromises }>;
export type IWithStandardMaterialTextureLoader = Readonly<{ load: (m: IMaterialProps<IStandardMaterialTexturePack>) => IStandardMaterialTextureUploadPromises }>;

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
