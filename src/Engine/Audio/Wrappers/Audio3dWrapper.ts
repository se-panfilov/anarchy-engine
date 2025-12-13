import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, sample, tap } from 'rxjs';
import { Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAudio3dParams, TAudio3dWrapper, TAudio3dWrapperDependencies } from '@/Engine/Audio/Models';
import type { TAudioLoop } from '@/Engine/Loop';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import { isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

// TODO 11.0.0: transform drive position? (connected?)
export function Audio3dWrapper({ sound, volume, position, name, performance }: TAudio3dParams, { loopService }: TAudio3dWrapperDependencies): TAudio3dWrapper {
  const entity: Howl = sound;
  const position$: BehaviorSubject<Vector3Like> = new BehaviorSubject<Vector3Like>(position);
  const listenerPosition$: BehaviorSubject<Vector3Like> = new BehaviorSubject<Vector3Like>(new Vector3());
  const updateVolume$: BehaviorSubject<Vector3Like> = new BehaviorSubject<Vector3Like>(position);
  // TODO 11.0.0: should use decibels instead of number?
  const volume$: BehaviorSubject<number> = new BehaviorSubject<number>(volume);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.000001);

  // TODO 11.0.0: should use decibels instead of number?
  const volumeSub: Subscription = volume$.pipe(distinctUntilChanged()).subscribe((volume: number): void => void entity.volume(volume));

  const audioLoop: TAudioLoop = loopService.getAudioLoop();

  const updateVolumeSub$: Subscription = updateVolume$
    .pipe(
      sample(audioLoop.tick$),
      // TODO 11.0.0: check filter logic
      filter((): boolean => updatePriority < audioLoop.priority$.value)
    )
    .subscribe((): void => {
      volume$.next(calculateVolume(soundPosition, listenerPos));
      const relativePos = soundPosition.sub(listenerPos);
      entity.pos(relativePos);
    });

  const positionChangeSub$: Subscription = onPositionUpdate(position$, noiseThreshold).subscribe((position: Vector3Like): void => updateVolume$.next(position));
  const listenerPositionChangeSub$: Subscription = onPositionUpdate(listenerPosition$, noiseThreshold).subscribe((position: Vector3Like): void => updateVolume$.next(position));

  // TODO 11.0.0: should use decibels instead of number?
  function calculateVolume(sourcePosition: Vector3, listenerPos: Vector3Like): number {
    // const distance: TMeters = getDistance(sourcePosition, listenerPos);
    const distance: TMeters = sourcePosition.distanceTo(listenerPos) as TMeters;

    // then farther, the quieter
    return Math.max(0, 1 - distance / 20);
  }

  // function getDistance(posA: Float32Array, posB: Float32Array): TMeters {
  //   return meters(Math.hypot(posA[0] - posB[0], posA[1] - posB[1], posA[2] - posB[2]));
  // }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    positionChangeSub$.unsubscribe();
    listenerPositionChangeSub$.unsubscribe();
    volumeSub.unsubscribe();
    updateVolumeSub$.unsubscribe();

    position$.complete();
    position$.unsubscribe();

    updateVolume$.complete();
    updateVolume$.unsubscribe();

    volume$.complete();
    volume$.unsubscribe();
  });

  return {
    ...AbstractWrapper(entity, WrapperType.Audio3d),
    getName: (): string => name,
    play: (): number => entity.play(),
    volume$,
    // TODO 11.0.0: shall I use transform drive instead?
    position$,
    listenerPosition$,
    ...destroyable
  };
}

function onPositionUpdate<T extends Vector3Like | Vector3 | TReadonlyVector3>(position$: BehaviorSubject<T>, noiseThreshold?: number): Observable<T> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return position$.pipe(
    distinctUntilChanged((_prev: T, curr: T): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, noiseThreshold ?? 0)),
    tap((value: T): void => {
      // eslint-disable-next-line functional/immutable-data
      prevValue[0] = value.x;
      // eslint-disable-next-line functional/immutable-data
      prevValue[1] = value.y;
      // eslint-disable-next-line functional/immutable-data
      prevValue[2] = value.z;
    })
  );
}
