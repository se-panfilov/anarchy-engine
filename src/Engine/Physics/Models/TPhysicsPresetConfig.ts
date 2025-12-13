import type { TWithNameOptional } from '@/Engine/Mixins';

import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';

export type TPhysicsPresetConfig = TPhysicsBodyConfig & Required<TWithNameOptional>;
