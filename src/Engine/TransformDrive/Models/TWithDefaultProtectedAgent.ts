import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TDefaultTransformAgent } from './TDefaultTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TWithDefaultProtectedAgent = Readonly<{ [TransformAgent.Default]: TProtectedTransformAgentFacade<TDefaultTransformAgent> }>;
