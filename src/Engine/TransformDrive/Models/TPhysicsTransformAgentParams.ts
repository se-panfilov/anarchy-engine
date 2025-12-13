import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Omit<TWithPresetNamePhysicsBodyParams, 'rotation'>;
