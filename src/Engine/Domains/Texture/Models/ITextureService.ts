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

export type IWithBasicMaterialTextureLoader = Readonly<{ load: (pack: IBasicMaterialTexturePack) => IBasicMaterialTextureUploadPromises }>;
export type IWithDepthMaterialTextureLoader = Readonly<{ load: (pack: IDepthMaterialTexturePack) => IDepthMaterialTextureUploadPromises }>;
export type IWithDistanceMaterialTextureLoader = Readonly<{ load: (pack: IDistanceMaterialTexturePack) => IDistanceMaterialTextureUploadPromises }>;
export type IWithNormalMaterialTextureLoader = Readonly<{ load: (pack: INormalMaterialTexturePack) => INormalMaterialTextureUploadPromises }>;
export type IWithMatcapMaterialTextureLoader = Readonly<{ load: (pack: IMatcapMaterialTexturePack) => IMatcapMaterialTextureUploadPromises }>;
export type IWithLamberMaterialTextureLoader = Readonly<{ load: (pack: ILambertMaterialTexturePack) => ILambertMaterialTextureUploadPromises }>;
export type IWithPhongMaterialTextureLoader = Readonly<{ load: (pack: IPhongMaterialTexturePack) => IPhongMaterialTextureUploadPromises }>;
export type IWithPhysicalMaterialTextureLoader = Readonly<{ load: (pack: IPhysicalMaterialTexturePack) => IPhysicalMaterialTextureUploadPromises }>;
export type IWithToonMaterialTextureLoader = Readonly<{ load: (pack: IToonMaterialTexturePack) => IToonMaterialTextureUploadPromises }>;
export type IWithStandardMaterialTextureLoader = Readonly<{ load: (pack: IStandardMaterialTexturePack) => IStandardMaterialTextureUploadPromises }>;

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
