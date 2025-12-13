import type { TPhysicsBody, TPhysicsBodyParams } from '@/Physics';
import type { TWithMandatoryField } from '@/Utils';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Readonly<{ physicsBody: TPhysicsBody }>;
export type TPhysicsTransformAgentInternalParams = Omit<TTransformAgentParams, 'rotation'> & TWithMandatoryField<TPhysicsBodyParams, 'rotation'>;
