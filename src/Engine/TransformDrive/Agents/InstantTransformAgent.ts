import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TDestroyable, TWithPosition3dProperty, TWithRotationProperty, TWithScaleProperty } from '@/Engine/Mixins';
import { destroyableMixin, withMoveBy3dMixin, withRotationMixin, withScaleMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import { withMutablePositionConnector, withMutableRotationConnector, withMutableScaleConnector } from '@/Engine/TransformDrive/Mixins';
import type { TInstantTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { updateSubjOnChange } from '@/Engine/Utils';

export function InstantTransformAgent(params: TTransformAgentParams): TInstantTransformAgent {
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

  const positionObj: TWithPosition3dProperty = { position: position$.value.clone() };
  const rotationObj: TWithRotationProperty = { rotation: rotation$.value.clone() };
  const scaleObj: TWithScaleProperty = { scale: scale$.value.clone() };

  const proxyPositionObj: TWithPosition3dProperty = updateSubjOnChange(positionObj, 'position', position$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone());
  const proxyRotationObj: TWithRotationProperty = updateSubjOnChange(rotationObj, 'rotation', rotation$, (value: TReadonlyEuler): TReadonlyEuler => value.clone());
  const proxyScaleObj: TWithScaleProperty = updateSubjOnChange(scaleObj, 'scale', scale$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone()) as TWithScaleProperty;

  return {
    ...destroyable,
    position$,
    rotation$,
    scale$,

    // TODO CWP
    // TODO 8.0.0. MODELS: Split instant agent into "Connector" and "Legacy" agents
    // TODO 8.0.0. MODELS: Add "Default" agent
    // TODO 8.0.0. MODELS: TransformDrive with "Default" agent should allow only p/r/s.next() methods

    // ...withMoveBy3dMixin(proxyPositionObj),
    // ...withRotationMixin(proxyRotationObj),
    // ...withScaleMixin(proxyScaleObj),
    ...withMutablePositionConnector(position$),
    ...withMutableRotationConnector(rotation$),
    ...withMutableScaleConnector(scale$)
  };
}
