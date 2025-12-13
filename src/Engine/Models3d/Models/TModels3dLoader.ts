import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TModel3dResourceConfig } from './TModel3dResourceConfig';

export type TModels3dLoader = TAbstractLoader<GLTF, TModel3dResourceConfig>;
