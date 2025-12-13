import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsPresetRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TPhysicsPresetParams>>;
