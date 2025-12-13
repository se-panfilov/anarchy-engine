import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TModel3dResourceAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<GLTF>>;
