import type { TPhysicsBody, TPhysicsBodyParams } from '@Anarchy/Engine/Physics';
import type { TWithMandatoryField } from '@hellpig/anarchy-shared/Utils';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Readonly<{ physicsBody: TPhysicsBody }>;
export type TPhysicsTransformAgentInternalParams = Omit<TTransformAgentParams, 'rotation'> & TWithMandatoryField<TPhysicsBodyParams, 'rotation'>;
