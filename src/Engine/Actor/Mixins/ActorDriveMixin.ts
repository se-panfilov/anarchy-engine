import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, switchMap } from 'rxjs';
import type { Euler } from 'three';
import { Vector3 } from 'three';

import { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorDriveMixin, TActorParams } from '@/Engine/Actor/Models';
import type { TKinematicDrive } from '@/Engine/Kinematic';
import { KinematicDrive } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

// TODO 8.0.0. MODELS: extract to separate file
type TAvailableDrives = Readonly<{
  [ActorDrive.Kinematic]: TKinematicDrive;
  // TODO 8.0.0. MODELS: implement physics drive
  // [ActorDrive.Physical]: TWithPhysics;
}>;

export function ActorDriveMixin(params: TActorParams, { kinematicLoopService }: Pick<TActorDependencies, 'kinematicLoopService'>): TActorDriveMixin {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.scale ?? new Vector3());
  const drive$: BehaviorSubject<ActorDrive> = new BehaviorSubject<ActorDrive>(params.drive);

  const kinematicDrive: TKinematicDrive = KinematicDrive(params, kinematicLoopService, drive$);
  // TODO 8.0.0. MODELS: implement physics drive
  // const physicsDrive: TWithPhysics = withPhysicsDrive(params, physicsLoopService, drive$);

  const destroyable: TDestroyable = destroyableMixin();
  // TODO 8.0.0. MODELS: implement physics drive

  const availableDrives: TAvailableDrives = { [ActorDrive.Kinematic]: kinematicDrive /*, [ActorDrive.Physical]: physicsDrive */ };

  const positionSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Vector3> => availableDrives[drive as keyof TAvailableDrives].position$)).subscribe(position$);
  const rotationSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Euler> => availableDrives[drive as keyof TAvailableDrives].rotation$)).subscribe(rotation$);
  const scaleSub$: Subscription = drive$.pipe(switchMap((drive: ActorDrive): Observable<Vector3 | undefined> => availableDrives[drive as keyof TAvailableDrives].scale$)).subscribe(scale$);

  const entities = {
    drive$,
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable(),
    scale$: scale$.asObservable(),
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
