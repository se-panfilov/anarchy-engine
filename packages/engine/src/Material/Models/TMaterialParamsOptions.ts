import type {
  LineBasicMaterialParameters,
  LineDashedMaterialParameters,
  MeshBasicMaterialParameters,
  MeshDepthMaterialParameters,
  MeshDistanceMaterialParameters,
  MeshLambertMaterialParameters,
  MeshMatcapMaterialParameters,
  MeshNormalMaterialParameters,
  MeshPhysicalMaterialParameters,
  MeshStandardMaterialParameters,
  MeshToonMaterialParameters,
  ShaderMaterialParameters,
  ShadowMaterialParameters,
  SpriteMaterialParameters
} from 'three';
import type { MaterialParameters } from 'three/src/materials/Material';
import type { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import type { PointsMaterialParameters } from 'three/src/materials/PointsMaterial';

export type TOmitNonMaterialOptionsFields<T extends MaterialParameters> = Omit<T, 'allowOverride' | 'defines' | 'id' | 'isMaterial' | 'name' | 'type' | 'userData' | 'uuid' | 'version'>;

export type TBasicMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshBasicMaterialParameters>;
export type TDepthMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshDepthMaterialParameters>;
export type TDistanceMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshDistanceMaterialParameters>;
export type TLambertMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshLambertMaterialParameters>;
export type TLineBasicMaterialParamsOptions = TOmitNonMaterialOptionsFields<LineBasicMaterialParameters>;
export type TLineDashedMaterialParamsOptions = TOmitNonMaterialOptionsFields<LineDashedMaterialParameters>;
export type TMatcapMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshMatcapMaterialParameters>;
export type TNormalMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshNormalMaterialParameters>;
export type TPhongMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshPhongMaterialParameters>;
export type TPhysicalMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshPhysicalMaterialParameters> & TMeshPhysicalMaterialParametersSetters;
export type TPointsMaterialParamsOptions = TOmitNonMaterialOptionsFields<PointsMaterialParameters>;
export type TShaderMaterialParamsOptions = TOmitNonMaterialOptionsFields<ShaderMaterialParameters>;
export type TShadowMaterialParamsOptions = TOmitNonMaterialOptionsFields<ShadowMaterialParameters>;
export type TSpriteMaterialParamsOptions = TOmitNonMaterialOptionsFields<SpriteMaterialParameters>;
export type TStandardMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshStandardMaterialParameters>;
export type TToonMaterialParamsOptions = TOmitNonMaterialOptionsFields<MeshToonMaterialParameters>;

// The following fields are setters and getters in MeshPhysicalMaterialParameters, so Schema generator cannot handle them. We have to add them manually.
export type TMeshPhysicalMaterialParametersSetters = Partial<
  Readonly<{
    reflectivity: number;
    anisotropy: number;
    clearcoat: number;
    iridescence: number;
    dispersion: number;
    sheen: number;
    transmission: number;
  }>
>;

export type TMaterialParamsOptions =
  | TBasicMaterialParamsOptions
  | TDepthMaterialParamsOptions
  | TDistanceMaterialParamsOptions
  | TLambertMaterialParamsOptions
  | TLineBasicMaterialParamsOptions
  | TLineDashedMaterialParamsOptions
  | TMatcapMaterialParamsOptions
  | TNormalMaterialParamsOptions
  | TPhongMaterialParamsOptions
  | TPhysicalMaterialParamsOptions
  | TPointsMaterialParamsOptions
  | TShaderMaterialParamsOptions
  | TShadowMaterialParamsOptions
  | TSpriteMaterialParamsOptions
  | TStandardMaterialParamsOptions
  | TToonMaterialParamsOptions;
