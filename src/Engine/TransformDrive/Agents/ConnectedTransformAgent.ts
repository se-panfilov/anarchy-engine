import type { Subscription } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withMutablePositionConnector, withMutableRotationConnector, withMutableScaleConnector } from '@/Engine/TransformDrive/Mixins';
import type { TAbstractTransformAgent, TConnectedTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

import { DefaultTransformAgent } from './DefaultTransformAgent';

export function ConnectedTransformAgent(params: TTransformAgentParams): TConnectedTransformAgent {
  const defaultTransformAgent: TAbstractTransformAgent = DefaultTransformAgent(params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    defaultTransformAgent.destroy$.next();
  });

  return {
    ...destroyable,
    ...defaultTransformAgent,
    ...withMutablePositionConnector(defaultTransformAgent.position$),
    ...withMutableRotationConnector(defaultTransformAgent.rotation$),
    ...withMutableScaleConnector(defaultTransformAgent.scale$)
  };
}
