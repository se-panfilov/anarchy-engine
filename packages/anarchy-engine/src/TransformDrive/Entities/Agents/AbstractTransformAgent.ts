import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TReadonlyTransform, TSerializedTransform, TTransformAgentParams } from '@Anarchy/Engine/TransformDrive/Models';
import { isDefined } from '@Anarchy/Shared/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

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
    onDeactivated$.next({ position: position$.value, rotation: rotation$.value, scale: scale$.value });
    onDeactivated$.complete();
    position$.complete();
    rotation$.complete();
    scale$.complete();
    enabled$.next(false);
    enabled$.complete();
    onActivated$.complete();
    relatedDriveId$.complete();
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
    relatedDriveId$,
    serialize: (): TSerializedTransform => ({
      position: position$.value,
      rotation: rotation$.value,
      scale: scale$.value
    })
  };
}
