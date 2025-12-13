import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, switchMap } from 'rxjs';
import type { Euler } from 'three';
import { Vector3 } from 'three';

import { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActorActiveDrives, TActorDependencies, TActorDriveMixin, TActorParams } from '@/Engine/Actor/Models';
import type { TKinematicActorDrive } from '@/Engine/Kinematic';
import { KinematicActorDrive } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsActorDrive } from '@/Engine/Physics';
import { PhysicsActorDrive } from '@/Engine/Physics';

export function ActorDriveMixin(params: TActorParams, { kinematicLoopService }: Pick<TActorDependencies, 'kinematicLoopService'>): TActorDriveMixin {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.scale ?? new Vector3());
  const drive$: BehaviorSubject<ActorDrive> = new BehaviorSubject<ActorDrive>(params.drive);

  const kinematicDrive: TKinematicActorDrive = KinematicActorDrive(params, kinematicLoopService, drive$);
  const physicsDrive: TPhysicsActorDrive = PhysicsActorDrive(params, drive$);

  const destroyable: TDestroyable = destroyableMixin();
  const availableDrives: TActorActiveDrives = { [ActorDrive.Kinematic]: kinematicDrive, [ActorDrive.Physical]: physicsDrive };

  const positionSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Vector3> => availableDrives[drive as keyof TActorActiveDrives].position$)).subscribe(position$);
  const rotationSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Euler> => availableDrives[drive as keyof TActorActiveDrives].rotation$)).subscribe(rotation$);
  const scaleSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Vector3 | undefined> => availableDrives[drive as keyof TActorActiveDrives].scale$)).subscribe(scale$);

  const entities = {
    drive$,
    position$,
    rotation$,
    scale$,
    ...destroyable,
    // TODO 8.0.0. MODELS: implement "ProtectedDriveFacade" to hide position$/rotation$/scale$ from external modifications (make them observable?)
    kinematic: ProtectedDriveFacade(kinematicDrive)
    // TODO 8.0.0. MODELS: implement physics drive
    // physics: ProtectedDriveFacade(physicsDrive)
  };

  destroyable.destroy$.subscribe(() => {
    // Stop subscriptions
    positionSub$.unsubscribe();
    rotationSub$.unsubscribe();
    scaleSub$.unsubscribe();

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
