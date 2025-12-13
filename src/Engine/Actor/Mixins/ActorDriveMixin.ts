import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import { ProtectedDriverFacade } from '@/Engine/Abstract';
import { ActorDriver } from '@/Engine/Actor/Constants';
import type { TActorActiveDrivers, TActorDependencies, TActorDriveMixin, TActorParams } from '@/Engine/Actor/Models';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import { KinematicActorDriver } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics';
import { PhysicsActorDriver } from '@/Engine/Physics';

export function ActorDriveMixin(params: TActorParams, { kinematicLoopService }: Pick<TActorDependencies, 'kinematicLoopService'>): TActorDriveMixin {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3 | undefined> = new BehaviorSubject<Vector3 | undefined>(params.scale);
  const driver$: BehaviorSubject<ActorDriver> = new BehaviorSubject<ActorDriver>(params.driver);

  const kinematicDriver: TKinematicActorDriver = KinematicActorDriver(params, kinematicLoopService, driver$);
  const physicsDriver: TPhysicsActorDriver = PhysicsActorDriver(params, driver$);

  const destroyable: TDestroyable = destroyableMixin();
  const availableDrives: TActorActiveDrivers = { [ActorDriver.Kinematic]: kinematicDriver, [ActorDriver.Physical]: physicsDriver };

  const positionSub$: Subscription = driver$.pipe(switchMap((drive: ActorDriver): Observable<Vector3> => availableDrives[drive as keyof TActorActiveDrivers].position$)).subscribe(position$);
  const rotationSub$: Subscription = driver$.pipe(switchMap((drive: ActorDriver): Observable<Euler> => availableDrives[drive as keyof TActorActiveDrivers].rotation$)).subscribe(rotation$);
  const scaleSub$: Subscription = driver$.pipe(switchMap((drive: ActorDriver): Observable<Vector3 | undefined> => availableDrives[drive as keyof TActorActiveDrivers].scale$)).subscribe(scale$);

  const entities = {
    ...destroyable,
    driver$,
    position$,
    rotation$,
    scale$,
    // TODO 8.0.0. MODELS: implement "ProtectedDriveFacade" to hide position$/rotation$/scale$ from external modifications (make them observable?)
    [ActorDriver.Kinematic]: ProtectedDriverFacade(kinematicDriver),
    [ActorDriver.Physical]: ProtectedDriverFacade(physicsDriver)
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
