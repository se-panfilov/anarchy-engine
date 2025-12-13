import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { Euler } from 'three';
import { Vector3 } from 'three';

import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorDriveMixin, TActorParams } from '@/Engine/Actor/Models';
import type { TWithKinematic } from '@/Engine/Kinematic';
import { withKinematicDrive } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function ActorDriveMixin(params: TActorParams, { kinematicLoopService }: Pick<TActorDependencies, 'kinematicLoopService'>): TActorDriveMixin {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.scale ?? new Vector3());
  const drive$: BehaviorSubject<ActorDrive> = new BehaviorSubject<ActorDrive>(params.drive);

  const destroyable: TDestroyable = destroyableMixin();

  const kinematicDrive: TWithKinematic = withKinematicDrive(params, kinematicLoopService, drive$);
  const kinematicDrivePositionSub$: Subscription = kinematicDrive.kinematic.data.position$.subscribe(position$);
  const kinematicDriveRotationSub$: Subscription = kinematicDrive.kinematic.data.rotationEuler$.subscribe(rotation$);

  // TODO 8.0.0. MODELS: implement physics drive mixin
  // const physicsDrive: TWithPhysics = withPhysicsDrive(params, physicsLoopService, drive$);
  // const physicsDrivePositionSub$: Subscription = physicsDrive.physicsBody.data.position$.subscribe(position$);
  // const physicsDriveRotationSub$: Subscription = physicsDrive.physicsBody.data.rotation.subscribe(rotation$);
  // const physicsDriveScaleSub$: Subscription = physicsDrive.physicsBody.data.scale$.subscribe(scale$);

  const entities = {
    drive$,
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable(),
    scale$: scale$.asObservable(),
    ...destroyable,
    ...kinematicDrive
    // TODO 8.0.0. MODELS: implement physics drive mixin
    // ...physicsDrive
  };

  destroyable.destroy$.subscribe(() => {
    // Stop subscriptions
    kinematicDrivePositionSub$.unsubscribe();
    kinematicDriveRotationSub$.unsubscribe();
    // TODO 8.0.0. MODELS: implement physics drive mixin
    // physicsDrivePositionSub$.unsubscribe();
    // physicsDriveRotationSub$.unsubscribe();
    // physicsDriveScaleSub$.unsubscribe();

    //Stop subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    scale$.complete();
    scale$.unsubscribe();

    entities.kinematic.destroy$.next();
    // TODO 8.0.0. MODELS: implement destroy of physics mixin (or remoe it if not needed)
    // entities.physicsBody.destroy$.next();
  });

  return entities;
}
