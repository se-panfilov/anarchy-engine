import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractResourceAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TModel3dResourceAsyncRegistry = TProtectedRegistry<TAbstractResourceAsyncRegistry<GLTF>>;
