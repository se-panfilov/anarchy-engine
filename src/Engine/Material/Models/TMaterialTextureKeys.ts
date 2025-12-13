import type {
  MeshBasicMaterialParameters,
  MeshDepthMaterialParameters,
  MeshDistanceMaterialParameters,
  MeshLambertMaterialParameters,
  MeshMatcapMaterialParameters,
  MeshNormalMaterialParameters,
  MeshPhongMaterialParameters,
  MeshPhysicalMaterialParameters,
  MeshStandardMaterialParameters,
  MeshToonMaterialParameters,
  PointsMaterialParameters
} from 'three';

type TMeshBasicMaterialPick = Pick<MeshBasicMaterialParameters, 'map' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap' | 'lightMap'>;
type TMeshDepthMaterialPick = Pick<MeshDepthMaterialParameters, 'map' | 'alphaMap' | 'displacementMap'>;
type TMeshDistanceMaterialPick = Pick<MeshDistanceMaterialParameters, 'map' | 'alphaMap'>;
type TMeshNormalMaterialPick = Pick<MeshNormalMaterialParameters, 'bumpMap' | 'normalMap' | 'displacementMap'>;
type TMeshMatcapMaterialPick = Pick<MeshMatcapMaterialParameters, 'map' | 'matcap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'alphaMap'>;
type TMeshLambertMaterialPick = Pick<MeshLambertMaterialParameters, 'map' | 'bumpMap' | 'displacementMap' | 'emissiveMap' | 'lightMap' | 'normalMap' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap'>;
type TMeshPhongMaterialPick = Pick<MeshPhongMaterialParameters, 'map' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'specularMap' | 'alphaMap' | 'envMap'>;
type TMeshPhysicalMaterialPick = TMeshStandardMaterialPick & Pick<MeshPhysicalMaterialParameters, 'clearcoatMap' | 'clearcoatRoughnessMap' | 'clearcoatNormalMap'>;
type TMeshToonMaterialPick = Pick<MeshToonMaterialParameters, 'map' | 'gradientMap' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'alphaMap'>;
type TMeshStandardMaterialPick = Pick<
  MeshStandardMaterialParameters,
  'map' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'roughnessMap' | 'metalnessMap' | 'alphaMap' | 'envMap'
>;
type TPointsMaterialPick = Pick<PointsMaterialParameters, 'map' | 'alphaMap'>;

export type TBasicMaterialTextureKeys = keyof TMeshBasicMaterialPick;
export type TDepthMaterialTextureKeys = keyof TMeshDepthMaterialPick;
export type TDistanceMaterialTextureKeys = keyof TMeshDistanceMaterialPick;
export type TNormalMaterialTextureKeys = keyof TMeshNormalMaterialPick;
export type TMatcapMaterialTextureKeys = keyof TMeshMatcapMaterialPick;
export type TLambertMaterialTextureKeys = keyof TMeshLambertMaterialPick;
export type TPhongMaterialTextureKeys = keyof TMeshPhongMaterialPick;
export type TPhysicalMaterialTextureKeys = keyof TMeshPhysicalMaterialPick;
export type TToonMaterialTextureKeys = keyof TMeshToonMaterialPick;
export type TStandardMaterialTextureKeys = keyof TMeshStandardMaterialPick;
export type TPointsMaterialTextureKeys = keyof TPointsMaterialPick;

export type TMaterialTextureKeys =
  | TBasicMaterialTextureKeys
  | TDepthMaterialTextureKeys
  | TDistanceMaterialTextureKeys
  | TNormalMaterialTextureKeys
  | TMatcapMaterialTextureKeys
  | TLambertMaterialTextureKeys
  | TPhysicalMaterialTextureKeys
  | TToonMaterialTextureKeys
  | TStandardMaterialTextureKeys
  | TPointsMaterialTextureKeys;
