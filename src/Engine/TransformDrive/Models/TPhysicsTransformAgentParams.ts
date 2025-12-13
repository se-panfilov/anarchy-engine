import type { TPhysicsBodyParams } from '@/Engine/Physics';
import type { TWithMandatoryField } from '@/Engine/Utils';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Omit<TPhysicsBodyParams, 'rotation'>;
export type TPhysicsTransformAgentInternalParams = Omit<TTransformAgentParams, 'rotation'> & TWithMandatoryField<TPhysicsBodyParams, 'rotation'>;
