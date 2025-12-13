import type { Subscription } from 'rxjs';

import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function DefaultTransformAgent(params: TTransformAgentParams): TAbstractTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Default);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  return { ...abstractTransformAgent };
}
