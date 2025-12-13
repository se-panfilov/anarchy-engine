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

export type TBasicMaterialPackKeys = keyof TMeshBasicMaterialPick;
export type TDepthMaterialPackKeys = keyof TMeshDepthMaterialPick;
export type TDistanceMaterialPackKeys = keyof TMeshDistanceMaterialPick;
export type TNormalMaterialPackKeys = keyof TMeshNormalMaterialPick;
export type TMatcapMaterialPackKeys = keyof TMeshMatcapMaterialPick;
export type TLambertMaterialPackKeys = keyof TMeshLambertMaterialPick;
export type TPhongMaterialPackKeys = keyof TMeshPhongMaterialPick;
export type TPhysicalMaterialPackKeys = keyof TMeshPhysicalMaterialPick;
export type TToonMaterialPackKeys = keyof TMeshToonMaterialPick;
export type TStandardMaterialPackKeys = keyof TMeshStandardMaterialPick;
export type TPointsMaterialPackKeys = keyof TPointsMaterialPick;

export type TMaterialPackKeys =
  | TBasicMaterialPackKeys
  | TDepthMaterialPackKeys
  | TDistanceMaterialPackKeys
  | TNormalMaterialPackKeys
  | TMatcapMaterialPackKeys
  | TLambertMaterialPackKeys
  | TPhysicalMaterialPackKeys
  | TToonMaterialPackKeys
  | TStandardMaterialPackKeys
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  | TPointsMaterialPackKeys;
