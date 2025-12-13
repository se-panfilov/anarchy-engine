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
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService } from '@/Engine/Space';
import type { TTextureLoadedPack, TTexturePackConfig, TTexturePackParams } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';
import type { TTextureFactory } from './TTextureFactory';
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

export type TWithBasicMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TBasicMaterialTexturePack>) => TBasicTextureUploadPromises }>;
export type TWithDepthMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TDepthMaterialTexturePack>) => TDepthTextureUploadPromises }>;
export type TWithDistanceMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TDistanceMaterialTexturePack>) => TDistanceTextureUploadPromises }>;
export type TWithNormalMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TNormalMaterialTexturePack>) => TNormalTextureUploadPromises }>;
export type TWithMatcapMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TMatcapMaterialTexturePack>) => TMatcapTextureUploadPromises }>;
export type TWithLamberMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TLambertMaterialTexturePack>) => TLambertTextureUploadPromises }>;
export type TWithPhongMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TPhongMaterialTexturePack>) => TPhongTextureUploadPromises }>;
export type TWithPhysicalMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TPhysicalMaterialTexturePack>) => TPhysicalTextureUploadPromises }>;
export type TWithToonMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TToonMaterialTexturePack>) => TToonTextureUploadPromises }>;
export type TWithStandardMaterialTextureLoader = Readonly<{ loadMaterialPack: (m: TMaterialPackParams<TStandardMaterialTexturePack>) => TStandardTextureUploadPromises }>;

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

// TODO 9.0.0. RESOURCES: Guess instead of "TTextureLoadedPack" should be a wrapper?
export type TTextureService = TWithCreateService<TTextureLoadedPack, TTexturePackParams> &
  TWithCreateFromConfigService<TTexturePackConfig> &
  TWithFactoryService<TTextureFactory> &
  TWithRegistryService<TTextureAsyncRegistry> &
  // TODO 9.0.0. RESOURCES: do we need resources registry?
  // TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithLoadResourcesAsyncService<TTexturePackConfig, TTextureLoadedPack> &
  TDestroyable &
  (
    | TBasicMaterialTextureService
    | TDepthMaterialTextureService
    | TDistanceMaterialTextureService
    | TNormalMaterialTextureService
    | TMatcapMaterialTextureService
    | TLamberMaterialTextureService
    | TPhongMaterialTextureService
    | TPhysicalMaterialTextureService
    | TToonMaterialTextureService
    | TStandardMaterialTextureService
  );
