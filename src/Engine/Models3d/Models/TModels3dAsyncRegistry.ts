import type { Group, Mesh } from 'three';

import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TModels3dAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<Mesh | Group>>;
