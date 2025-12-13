import type { TPhysicsBody, TPhysicsBodyParams } from '@Anarchy/Engine/Physics';
import type { TWithMandatoryField } from '@Shared/Utils';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Readonly<{ physicsBody: TPhysicsBody }>;
export type TPhysicsTransformAgentInternalParams = Omit<TTransformAgentParams, 'rotation'> & TWithMandatoryField<TPhysicsBodyParams, 'rotation'>;
