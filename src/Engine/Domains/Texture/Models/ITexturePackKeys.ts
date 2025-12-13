import type { MeshBasicMaterialParameters } from 'three';

export type ITexturePackKeys = keyof Pick<MeshBasicMaterialParameters, 'map' | 'aoMap' | 'specularMap' | 'alphaMap' | 'envMap' | 'lightMap'>;
