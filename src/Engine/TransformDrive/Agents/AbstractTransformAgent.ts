import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TReadonlyTransform, TTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined } from '@/Engine/Utils';

export function AbstractTransformAgent(params: TTransformAgentParams, type: TransformAgent): TAbstractTransformAgent {
  const id: string = type + '_transform_agent_' + nanoid();
  const relatedDriveId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  // IMPORTANT: enabled$ doesn't do anything by in AbstractTransformAgent. You have to implement that logic yourself
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.enabled ?? false);
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotation$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.scale);
  const onActivated$: Subject<TReadonlyTransform> = new Subject<TReadonlyTransform>();
  const onDeactivated$: Subject<TReadonlyTransform> = new Subject<TReadonlyTransform>();

  const onDeactivated$Sub: Subscription = onDeactivated$.subscribe((transform: TReadonlyTransform): void => {
    if (isDefined(params.onDeactivated)) params.onDeactivated(transform);
  });

  const onActivated$Sub: Subscription = onActivated$.subscribe(({ position, rotation, scale }: TReadonlyTransform): void => {
    if (isDefined(params.onActivated)) params.onActivated({ position, rotation, scale });
  });

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    onDeactivated$Sub?.unsubscribe();
    onActivated$Sub?.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    onActivated$.complete();
    onActivated$.unsubscribe();
    onDeactivated$.complete();
    onDeactivated$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
    relatedDriveId$.complete();
    relatedDriveId$.unsubscribe();
  });

  return {
    ...destroyable,
    id,
    type,
    position$,
    rotation$,
    scale$,
    enabled$,
    onActivated$,
    onDeactivated$,
    relatedDriveId$
  };
}
