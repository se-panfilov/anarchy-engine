import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TConnectedTransformAgent } from './TConnectedTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TWithConnectedProtectedAgent = Readonly<{ [TransformAgent.Connected]: TProtectedTransformAgentFacade<TConnectedTransformAgent> }>;
