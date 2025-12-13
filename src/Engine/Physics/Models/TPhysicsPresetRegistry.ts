import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsPresetRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TPhysicsBodyParams>>;
