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

type IMeshBasicMaterialPick = Pick<MeshBasicMaterialParameters, 'map' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap' | 'lightMap'>;
type IMeshDepthMaterialPick = Pick<MeshDepthMaterialParameters, 'map' | 'alphaMap' | 'displacementMap'>;
type IMeshDistanceMaterialPick = Pick<MeshDistanceMaterialParameters, 'map' | 'alphaMap'>;
type IMeshNormalMaterialPick = Pick<MeshNormalMaterialParameters, 'bumpMap' | 'normalMap' | 'displacementMap'>;
type IMeshMatcapMaterialPick = Pick<MeshMatcapMaterialParameters, 'map' | 'matcap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'alphaMap'>;
type IMeshLambertMaterialPick = Pick<MeshLambertMaterialParameters, 'map' | 'bumpMap' | 'displacementMap' | 'emissiveMap' | 'lightMap' | 'normalMap' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap'>;
type IMeshPhongMaterialPick = Pick<MeshPhongMaterialParameters, 'map' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'specularMap' | 'alphaMap' | 'envMap'>;
type IMeshPhysicalMaterialPick = IMeshStandardMaterialPick & Pick<MeshPhysicalMaterialParameters, 'clearcoatMap' | 'clearcoatRoughnessMap' | 'clearcoatNormalMap'>;
type IMeshToonMaterialPick = Pick<MeshToonMaterialParameters, 'map' | 'gradientMap' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'alphaMap'>;
type IMeshStandardMaterialPick = Pick<
  MeshStandardMaterialParameters,
  'map' | 'lightMap' | 'aoMap' | 'emissiveMap' | 'bumpMap' | 'normalMap' | 'displacementMap' | 'roughnessMap' | 'metalnessMap' | 'alphaMap' | 'envMap'
>;
type IPointsMaterialPick = Pick<PointsMaterialParameters, 'map' | 'alphaMap'>;

export type IBasicMaterialPackKeys = keyof IMeshBasicMaterialPick;
export type IDepthMaterialPackKeys = keyof IMeshDepthMaterialPick;
export type IDistanceMaterialPackKeys = keyof IMeshDistanceMaterialPick;
export type INormalMaterialPackKeys = keyof IMeshNormalMaterialPick;
export type IMatcapMaterialPackKeys = keyof IMeshMatcapMaterialPick;
export type ILambertMaterialPackKeys = keyof IMeshLambertMaterialPick;
export type IPhongMaterialPackKeys = keyof IMeshPhongMaterialPick;
export type IPhysicalMaterialPackKeys = keyof IMeshPhysicalMaterialPick;
export type IToonMaterialPackKeys = keyof IMeshToonMaterialPick;
export type IStandardMaterialPackKeys = keyof IMeshStandardMaterialPick;
export type IPointsMaterialPackKeys = keyof IPointsMaterialPick;

export type IMaterialPackKeys =
  | IBasicMaterialPackKeys
  | IDepthMaterialPackKeys
  | IDistanceMaterialPackKeys
  | INormalMaterialPackKeys
  | IMatcapMaterialPackKeys
  | ILambertMaterialPackKeys
  | IPhysicalMaterialPackKeys
  | IToonMaterialPackKeys
  | IStandardMaterialPackKeys
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  | IPointsMaterialPackKeys;
