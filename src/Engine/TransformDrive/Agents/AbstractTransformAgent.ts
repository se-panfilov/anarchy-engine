import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

export function AbstractTransformAgent(params: TTransformAgentParams, type: TransformAgent): TAbstractTransformAgent {
  const id: string = type + '_transform_agent_' + nanoid();
  // TODO 8.0.0. MODELS: perhaps enabled$ should be false by default
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotation$: BehaviorSubject<TReadonlyEuler> = new BehaviorSubject<TReadonlyEuler>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.scale);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  return {
    ...destroyable,
    id,
    type,
    position$,
    rotation$,
    scale$,
    enabled$
  };
}
