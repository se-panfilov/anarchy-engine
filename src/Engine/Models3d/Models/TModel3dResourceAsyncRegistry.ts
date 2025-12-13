import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TModel3dResourceAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<Group | Mesh | Object3D>>;
