import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TWithMandatoryField } from '@/Engine/Utils';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TPhysicsTransformAgentParams = TTransformAgentParams & Omit<TWithPresetNamePhysicsBodyParams, 'rotation'>;
export type TPhysicsTransformAgentInternalParams = Omit<TTransformAgentParams, 'rotation'> & TWithMandatoryField<TWithPresetNamePhysicsBodyParams, 'rotation'>;
