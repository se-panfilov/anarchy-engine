import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TAbstractInstantTransformAgent } from './TAbstractInstantTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TWithInstantProtectedAgent = Readonly<{ [TransformAgent.Instant]: TProtectedTransformAgentFacade<TAbstractInstantTransformAgent> }>;
