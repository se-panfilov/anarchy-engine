import type { TAbstractLoader } from '@Engine/Abstract';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TModel3dResourceConfig } from './TModel3dResourceConfig';
import type { TModels3dMetaInfoRegistry } from './TModels3dMetaInfoRegistry';
import type { TModels3dResourceAsyncRegistry } from './TModels3dResourceAsyncRegistry';

export type TModels3dLoader = TAbstractLoader<GLTF, TModel3dResourceConfig, TModels3dResourceAsyncRegistry, TModels3dMetaInfoRegistry>;
