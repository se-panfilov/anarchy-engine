import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TWithProtectedTransformAgents<TAgents extends Partial<Record<TransformAgent, TAbstractTransformAgent>>> = Readonly<{
  [K in keyof TAgents]: TProtectedTransformAgentFacade<Extract<TAgents[K], TAbstractTransformAgent>>;
}>;
