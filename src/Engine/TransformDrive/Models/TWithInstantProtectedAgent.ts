import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TInstantTransformAgent } from './TInstantTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TWithInstantProtectedAgent = Readonly<{ [TransformAgent.Instant]: TProtectedTransformAgentFacade<TInstantTransformAgent> }>;
