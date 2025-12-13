import type { Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, switchMap } from 'rxjs';
import type { Euler } from 'three';
import { Vector3 } from 'three';

import { ActorDrive } from '@/Engine/Actor/Constants';
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

  const kinematicDrive: TWithKinematic = withKinematicDrive(params, kinematicLoopService, drive$);
  // TODO 8.0.0. MODELS: implement physics drive mixin
  // const physicsDrive: TWithPhysics = withPhysicsDrive(params, physicsLoopService, drive$);

  const destroyable: TDestroyable = destroyableMixin();

  // TODO 8.0.0. MODELS: should I replace EMPTY in subscriptions with some default scale value?

  const positionSub$: Subscription = drive$
    .pipe(
      switchMap((drive: ActorDrive) => {
        switch (drive) {
          case ActorDrive.Kinematic:
            return kinematicDrive.kinematic.position$;
          case ActorDrive.Physical:
          // TODO 8.0.0. MODELS: implement physics drive mixin
          // return physicsDrive.physics.position$;
          case ActorDrive.None:
            return EMPTY;
          default:
            throw new Error(`ActorDriveMixin: drive ${drive} is not supported`);
        }
      })
    )
    .subscribe(position$);

  const rotationSub$: Subscription = drive$
    .pipe(
      switchMap((drive: ActorDrive) => {
        switch (drive) {
          case ActorDrive.Kinematic:
            return kinematicDrive.kinematic.rotationEuler$;
          case ActorDrive.Physical:
          // TODO 8.0.0. MODELS: implement physics drive mixin
          // return physicsDrive.physics.rotationEuler$;
          case ActorDrive.None:
            return EMPTY;
          default:
            throw new Error(`ActorDriveMixin: drive ${drive} is not supported`);
        }
      })
    )
    .subscribe(rotation$);

  const scaleSub$: Subscription = drive$
    .pipe(
      switchMap((drive: ActorDrive) => {
        switch (drive) {
          case ActorDrive.Kinematic:
            return EMPTY;
          //   return kinematicDrive.kinematic.scale$;
          case ActorDrive.Physical:
          // TODO 8.0.0. MODELS: implement physics drive mixin
          // return physicsDrive.physics.scale$;
          case ActorDrive.None:
            return EMPTY;
          default:
            throw new Error(`ActorDriveMixin: drive ${drive} is not supported`);
        }
      })
    )
    .subscribe(scale$);

  let subscriptions: ReadonlyArray<Subscription> = [positionSub$, rotationSub$, scaleSub$];

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
    subscriptions.forEach((subscription: Subscription): void => subscription.unsubscribe());
    subscriptions = [];

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
