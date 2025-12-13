import type { Subscription } from 'rxjs';

import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TPhysicsTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

import { AbstractTransformAgent } from './AbstractTransformAgent';

// TODO 8.0.0. MODELS: This is a placeholder for PhysicsTransformAgent
export function PhysicsTransformAgent(params: TTransformAgentParams): TPhysicsTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Physical);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  return {
    ...abstractTransformAgent
  };
}
