import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, ReplaySubject, sampleTime, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TAbstractDriver, TProtectedDriverFacade } from '@/Engine/Abstract';
import { ProtectedDriverFacade } from '@/Engine/Abstract';
import { ActorDriver } from '@/Engine/Actor/Constants';
import type { TActorDrive, TActorDrivers, TActorParams, TProtectedActorDrivers } from '@/Engine/Actor/Models';
import { isEqualOrSimilar } from '@/Engine/Actor/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function ActorDrive(params: TActorParams, drivers: TActorDrivers): TActorDrive {
  //We don't want to expose these BehaviorSubjects, because they're vulnerable to external changes without .next()
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const positionRep$: ReplaySubject<Vector3> = new ReplaySubject<Vector3>(1);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const rotationRep$: ReplaySubject<Euler> = new ReplaySubject<Euler>(1);
  const scale$: BehaviorSubject<Vector3 | undefined> = new BehaviorSubject<Vector3 | undefined>(params.scale);
  const scaleRep$: ReplaySubject<Vector3 | undefined> = new ReplaySubject<Vector3 | undefined>(1);

  position$.subscribe(positionRep$);
  rotation$.subscribe(rotationRep$);
  scale$.subscribe(scaleRep$);

  const driver$: BehaviorSubject<ActorDriver> = new BehaviorSubject<ActorDriver>(params.driver ?? ActorDriver.None);

  const destroyable: TDestroyable = destroyableMixin();

  const delay: number = params.driveUpdateDelay ?? 16; // 60 FPS
  const threshold: number = params.driveCoordsThreshold ?? 0.001;

  const positionSub$: Subscription = driver$
    .pipe(
      switchMap((drive: ActorDriver): Observable<Vector3> => drivers[drive as keyof TActorDrivers].position$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(position$);

  const rotationSub$: Subscription = driver$
    .pipe(
      switchMap((drive: ActorDriver): Observable<Euler> => drivers[drive as keyof TActorDrivers].rotation$),
      distinctUntilChanged((prev: Euler, curr: Euler): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(rotation$);

  const scaleSub$: Subscription = driver$
    .pipe(
      switchMap((drive: ActorDriver): Observable<Vector3 | undefined> => drivers[drive as keyof TActorDrivers].scale$),
      filter((value: Vector3 | undefined): value is Vector3 => value !== undefined),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(scale$);

  const result: TActorDrive = {
    ...destroyable,
    driver$,
    position$: positionRep$,
    getPosition: (): Vector3 => position$.value.clone(),
    rotation$: rotationRep$,
    getRotation: (): Euler => rotation$.value.clone(),
    scale$: scaleRep$,
    getScale: (): Vector3 | undefined => scale$.value?.clone(),
    ...getDynamicDrivers(drivers)
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

    Object.values(drivers).forEach((driver: TProtectedDriverFacade<TAbstractDriver>): void => driver.destroy$.next());
  });

  return result;
}

function getDynamicDrivers(drivers: TActorDrivers): TProtectedActorDrivers {
  return Object.fromEntries(Object.entries(drivers).map((v) => [v[0], ProtectedDriverFacade(v[1])])) as TProtectedActorDrivers;
}
