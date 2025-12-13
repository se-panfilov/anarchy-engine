import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsObjectParams } from './TPhysicsObjectParams';

export type TPhysicsObjectRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TPhysicsObjectParams>>;
