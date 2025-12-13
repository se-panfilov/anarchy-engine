import type { TWithName } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsPresetParams = TOptional<TPhysicsBodyParams> & Required<TWithName>;
