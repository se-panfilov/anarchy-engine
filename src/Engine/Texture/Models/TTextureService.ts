import type {
  TBasicMaterialTexturePack,
  TDepthMaterialTexturePack,
  TDistanceMaterialTexturePack,
  TLambertMaterialTexturePack,
  TMatcapMaterialTexturePack,
  TMaterialPackParams,
  TNormalMaterialTexturePack,
  TPhongMaterialTexturePack,
  TPhysicalMaterialTexturePack,
  TStandardMaterialTexturePack,
  TToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack/Models';

import type {
  TBasicTextureUploadPromises,
  TDepthTextureUploadPromises,
  TDistanceTextureUploadPromises,
  TLambertTextureUploadPromises,
  TMatcapTextureUploadPromises,
  TNormalTextureUploadPromises,
  TPhongTextureUploadPromises,
  TPhysicalTextureUploadPromises,
  TStandardTextureUploadPromises,
  TToonTextureUploadPromises
} from './TTextureUploadPromises';

export type TWithBasicMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TBasicMaterialTexturePack>) => TBasicTextureUploadPromises }>;
export type TWithDepthMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TDepthMaterialTexturePack>) => TDepthTextureUploadPromises }>;
export type TWithDistanceMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TDistanceMaterialTexturePack>) => TDistanceTextureUploadPromises }>;
export type TWithNormalMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TNormalMaterialTexturePack>) => TNormalTextureUploadPromises }>;
export type TWithMatcapMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TMatcapMaterialTexturePack>) => TMatcapTextureUploadPromises }>;
export type TWithLamberMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TLambertMaterialTexturePack>) => TLambertTextureUploadPromises }>;
export type TWithPhongMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TPhongMaterialTexturePack>) => TPhongTextureUploadPromises }>;
export type TWithPhysicalMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TPhysicalMaterialTexturePack>) => TPhysicalTextureUploadPromises }>;
export type TWithToonMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TToonMaterialTexturePack>) => TToonTextureUploadPromises }>;
export type TWithStandardMaterialTextureLoader = Readonly<{ load: (m: TMaterialPackParams<TStandardMaterialTexturePack>) => TStandardTextureUploadPromises }>;

export type TBasicMaterialTextureService = TWithBasicMaterialTextureLoader;
export type TDepthMaterialTextureService = TWithDepthMaterialTextureLoader;
export type TDistanceMaterialTextureService = TWithDistanceMaterialTextureLoader;
export type TNormalMaterialTextureService = TWithNormalMaterialTextureLoader;
export type TMatcapMaterialTextureService = TWithMatcapMaterialTextureLoader;
export type TLamberMaterialTextureService = TWithLamberMaterialTextureLoader;
export type TPhongMaterialTextureService = TWithPhongMaterialTextureLoader;
export type TPhysicalMaterialTextureService = TWithPhysicalMaterialTextureLoader;
export type TToonMaterialTextureService = TWithToonMaterialTextureLoader;
export type TStandardMaterialTextureService = TWithStandardMaterialTextureLoader;

export type TTextureService =
  | TBasicMaterialTextureService
  | TDepthMaterialTextureService
  | TDistanceMaterialTextureService
  | TNormalMaterialTextureService
  | TMatcapMaterialTextureService
  | TLamberMaterialTextureService
  | TPhongMaterialTextureService
  | TPhysicalMaterialTextureService
  | TToonMaterialTextureService
  | TStandardMaterialTextureService;
