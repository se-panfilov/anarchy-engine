import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, sample, Subject, tap } from 'rxjs';
import type { AudioListener, PositionalAudio } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAudio3dParams, TAudio3dTransformDrive, TAudio3dWrapper, TAudioFadeParams, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@/Engine/Audio/TransformDrive';
import { createPositionalAudion, fadeAudio, seekAudio } from '@/Engine/Audio/Utils';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function Audio3dWrapper(params: TAudio3dParams, { audioLoop }: TAudioWrapperDependencies): TAudio3dWrapper {
  const { audioSource, volume, position, performance } = params;
  const entity: PositionalAudio = createPositionalAudion(audioSource, params);
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(position);

  const pause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.pause ?? false);
  const fade$: Subject<TAudioFadeParams> = new Subject<TAudioFadeParams>();
  const speed$: BehaviorSubject<number> = new BehaviorSubject<number>(params.speed ?? 1);
  const seek$: BehaviorSubject<number> = new BehaviorSubject<number>(params.seek ?? 0);
  const loop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.loop ?? false);
  const volume$: BehaviorSubject<number> = new BehaviorSubject<number>(volume);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  // TODO 11.0.0: maybe the default threshold should be higher?
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.000001);

  const volumeSub$: Subscription = volume$.pipe(distinctUntilChanged()).subscribe((volume: number): void => void entity.setVolume(volume));

  const pauseSub$: Subscription = pause$.pipe(distinctUntilChanged()).subscribe((isPause: boolean): void => {
    console.log('XXX pause', isPause);
    // if (isPause) pauseAudio(entity);
    // else resumeAudio(entity);
  });

  const fadeSub$: Subscription = fade$
    .pipe(distinctUntilChanged((prev: TAudioFadeParams, curr: TAudioFadeParams): boolean => prev.to === curr.to && prev.duration === curr.duration))
    .subscribe((fadeParams: TAudioFadeParams): void => fadeAudio(entity, fadeParams));

  const speedSub$: Subscription = speed$.pipe(distinctUntilChanged()).subscribe((speed: number): void => void entity.setPlaybackRate(speed));
  const seekSub$: Subscription = seek$.pipe(distinctUntilChanged()).subscribe((seek: number): void => seekAudio(entity, seek));
  const sourcePositionUpdate$: Observable<TReadonlyVector3> = onPositionUpdate(position$, noiseThreshold);

  const updateVolumeSub$: Subscription = sourcePositionUpdate$
    .pipe(
      sample(audioLoop.tick$),
      // TODO 11.0.0: check filter logic
      filter((): boolean => updatePriority >= audioLoop.priority$.value)
    )
    .subscribe((position: TReadonlyVector3): void => {
      entity.position.copy(position);
    });

  const wrapper: TWrapper<PositionalAudio> = AbstractWrapper(entity, WrapperType.Audio3d, params);
  const drive: TAudio3dTransformDrive = Audio3dTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    pauseSub$.unsubscribe();
    fadeSub$.unsubscribe();
    driveToTargetConnector.destroy$.next();
    volumeSub$.unsubscribe();
    updateVolumeSub$.unsubscribe();
    speedSub$.unsubscribe();
    seekSub$.unsubscribe();

    position$.complete();
    position$.unsubscribe();

    pause$.complete();
    pause$.unsubscribe();
    fade$.complete();
    fade$.unsubscribe();
    speed$.complete();
    speed$.unsubscribe();
    seek$.complete();
    seek$.unsubscribe();
    loop$.complete();
    loop$.unsubscribe();
    volume$.complete();
    volume$.unsubscribe();

    // TODO 11.0.0: do we need to do unload here?
  });

  return {
    ...wrapper,
    drive,
    play: (): void => void entity.play(),
    pause$,
    fade$,
    speed$,
    seek$,
    loop$,
    isPlaying: (): boolean => entity.isPlaying,
    getDuration: (): number | undefined => entity.duration,
    stop: (): void => void entity.stop(),
    volume$,
    getListener: (): AudioListener => entity.listener,
    position$,
    ...destroyable
  };
}

function onPositionUpdate(position$: BehaviorSubject<TReadonlyVector3>, noiseThreshold?: number): Observable<TReadonlyVector3> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return position$.pipe(
    distinctUntilChanged((_prev: TReadonlyVector3, curr: TReadonlyVector3): boolean =>
      isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, noiseThreshold ?? 0)
    ),
    tap((value: TReadonlyVector3): void => {
      // eslint-disable-next-line functional/immutable-data
      prevValue[0] = value.x;
      // eslint-disable-next-line functional/immutable-data
      prevValue[1] = value.y;
      // eslint-disable-next-line functional/immutable-data
      prevValue[2] = value.z;
    })
  );
}
