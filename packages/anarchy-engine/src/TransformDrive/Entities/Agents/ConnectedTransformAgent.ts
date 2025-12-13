import { TransformAgent } from '@Engine/TransformDrive/Constants';
import { withMutablePositionConnector, withMutableRotationConnector, withMutableScaleConnector } from '@Engine/TransformDrive/Mixins';
import type { TAbstractTransformAgent, TConnectedTransformAgent, TTransformAgentParams } from '@Engine/TransformDrive/Models';
import type { Subscription } from 'rxjs';

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
