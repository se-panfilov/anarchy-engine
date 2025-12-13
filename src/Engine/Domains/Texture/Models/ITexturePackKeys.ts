import type { MeshBasicMaterialParameters, MeshLambertMaterialParameters, MeshMatcapMaterialParameters, MeshStandardMaterialParameters } from 'three';

type IMeshBasicMaterialPick = Pick<MeshBasicMaterialParameters, 'map' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap' | 'lightMap'>;
type IMeshMatcapMaterialPick = Pick<MeshMatcapMaterialParameters, 'matcap' | 'bumpMap' | 'normalMap' | 'displacementMap'>;
type IMeshLambertMaterialPick = Pick<MeshLambertMaterialParameters, 'emissiveMap' | 'lightMap' | 'specularMap'>;
type IMeshStandardMaterialPick = Pick<MeshStandardMaterialParameters, 'roughnessMap' | 'metalnessMap'>;

export type ITexturePackKeys = keyof (IMeshBasicMaterialPick & IMeshMatcapMaterialPick & IMeshLambertMaterialPick & IMeshStandardMaterialPick);
