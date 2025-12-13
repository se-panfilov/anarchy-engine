import type { Group } from 'three';

import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TModels3dAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<Group>>;
