import type { Subscription } from 'rxjs';

import { TransformAgent } from '@/TransformDrive/Constants';
import { withMutablePositionConnector, withMutableRotationConnector, withMutableScaleConnector } from '@/TransformDrive/Mixins';
import type { TAbstractTransformAgent, TConnectedTransformAgent, TTransformAgentParams } from '@/TransformDrive/Models';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function ConnectedTransformAgent(params: TTransformAgentParams): TConnectedTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Connected);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractTransformAgent, {
    ...withMutablePositionConnector(abstractTransformAgent.position$),
    ...withMutableRotationConnector(abstractTransformAgent.rotation$),
    ...withMutableScaleConnector(abstractTransformAgent.scale$)
  });
}
