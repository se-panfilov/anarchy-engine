import type {
  LineBasicMaterial,
  LineDashedMaterial,
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
  PointsMaterial,
  RawShaderMaterial,
  ShaderMaterial,
  ShadowMaterial,
  SpriteMaterial
} from 'three';

import type { TWrapper } from '@/Engine/Abstract';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialEntityToConfigDependencies } from './TMaterialEntityToConfigDependencies';
import type { TMaterials } from './TMaterials';

export type TAbstractMaterialWrapper<T extends TMaterials> = Omit<TWrapper<T>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TMaterialEntityToConfigDependencies) => TMaterialConfig;
  }>;

export type TLineBasicMaterialWrapper = TAbstractMaterialWrapper<LineBasicMaterial>;
export type TLineDashedMaterialWrapper = TAbstractMaterialWrapper<LineDashedMaterial>;
export type TBasicMaterialWrapper = TAbstractMaterialWrapper<MeshBasicMaterial>;
export type TDepthMaterialWrapper = TAbstractMaterialWrapper<MeshDepthMaterial>;
export type TDistanceMaterialWrapper = TAbstractMaterialWrapper<MeshDistanceMaterial>;
export type TLambertMaterialWrapper = TAbstractMaterialWrapper<MeshLambertMaterial>;
export type TMatcapMaterialWrapper = TAbstractMaterialWrapper<MeshMatcapMaterial>;
export type TNormalMaterialWrapper = TAbstractMaterialWrapper<MeshNormalMaterial>;
export type TPhongMaterialWrapper = TAbstractMaterialWrapper<MeshPhongMaterial>;
export type TPhysicalMaterialWrapper = TAbstractMaterialWrapper<MeshPhysicalMaterial>;
export type TStandardMaterialWrapper = TAbstractMaterialWrapper<MeshStandardMaterial>;
export type TToonMaterialWrapper = TAbstractMaterialWrapper<MeshToonMaterial>;
export type TPointsMaterialWrapper = TAbstractMaterialWrapper<PointsMaterial>;
export type TRawShaderMaterialWrapper = TAbstractMaterialWrapper<RawShaderMaterial>;
export type TShaderMaterialWrapper = TAbstractMaterialWrapper<ShaderMaterial>;
export type TShadowMaterialWrapper = TAbstractMaterialWrapper<ShadowMaterial>;
export type TSpriteMaterialWrapper = TAbstractMaterialWrapper<SpriteMaterial>;

export type TMaterialWrapper =
  | TLineBasicMaterialWrapper
  | TLineDashedMaterialWrapper
  | TBasicMaterialWrapper
  | TDepthMaterialWrapper
  | TDistanceMaterialWrapper
  | TLambertMaterialWrapper
  | TMatcapMaterialWrapper
  | TNormalMaterialWrapper
  | TPhongMaterialWrapper
  | TPhysicalMaterialWrapper
  | TStandardMaterialWrapper
  | TToonMaterialWrapper
  | TPointsMaterialWrapper
  | TRawShaderMaterialWrapper
  | TShaderMaterialWrapper
  | TShadowMaterialWrapper
  | TSpriteMaterialWrapper;
