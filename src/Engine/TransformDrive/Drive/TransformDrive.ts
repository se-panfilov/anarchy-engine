import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, ReplaySubject, sampleTime, switchMap } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import { isEqualOrSimilar } from '@/Engine/Actor/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TransformDriver } from '@/Engine/TransformDrive/Constants';
import { ProtectedDriverFacade } from '@/Engine/TransformDrive/Facades';
import type { TAbstractTransformDriver, TProtectedTransformDriverFacade, TProtectedTransformDrivers, TTransformDrive, TTransformDriveParams, TTransformDrivers } from '@/Engine/TransformDrive/Models';

export function TransformDrive(params: TTransformDriveParams, drivers: TTransformDrivers): TTransformDrive {
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

  const driver$: BehaviorSubject<TransformDriver> = new BehaviorSubject<TransformDriver>(params.driver ?? TransformDriver.Instant);

  const destroyable: TDestroyable = destroyableMixin();

  const delay: number = params.updateDelay ?? 16; // 60 FPS
  const threshold: number = params.noiseThreshold ?? 0.001;

  const positionSub$: Subscription = driver$
    .pipe(
      switchMap((drive: TransformDriver): Observable<Vector3> => drivers[drive as keyof TTransformDrivers].position$),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(position$);

  const rotationSub$: Subscription = driver$
    .pipe(
      switchMap((drive: TransformDriver): Observable<Euler> => drivers[drive as keyof TTransformDrivers].rotation$),
      distinctUntilChanged((prev: Euler, curr: Euler): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(rotation$);

  const scaleSub$: Subscription = driver$
    .pipe(
      switchMap((drive: TransformDriver): Observable<Vector3 | undefined> => drivers[drive as keyof TTransformDrivers].scale$),
      filter((value: Vector3 | undefined): value is Vector3 => value !== undefined),
      distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => isEqualOrSimilar(prev, curr, threshold)),
      sampleTime(delay)
    )
    .subscribe(scale$);

  const result: TTransformDrive = {
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

    Object.values(drivers).forEach((driver: TProtectedTransformDriverFacade<TAbstractTransformDriver>): void => driver.destroy$.next());
  });

  return result;
}

function getDynamicDrivers(drivers: TTransformDrivers): TProtectedTransformDrivers {
  return Object.fromEntries(Object.entries(drivers).map((v) => [v[0], ProtectedDriverFacade(v[1])])) as TProtectedTransformDrivers;
}
