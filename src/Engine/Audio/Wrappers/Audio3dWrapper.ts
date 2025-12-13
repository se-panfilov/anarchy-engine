import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, sample, skipWhile, Subject, tap } from 'rxjs';
import type { AudioListener, PositionalAudio } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAudio3dParams, TAudio3dTransformDrive, TAudio3dWrapper, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@/Engine/Audio/TransformDrive';
import { createPositionalAudion, seekAudio } from '@/Engine/Audio/Utils';
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
  const listener$: BehaviorSubject<AudioListener | undefined> = new BehaviorSubject<AudioListener | undefined>(params.listener);

  const play$: Subject<boolean> = new Subject<boolean>();
  const pause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.pause ?? false);
  const speed$: BehaviorSubject<number> = new BehaviorSubject<number>(params.speed ?? 1);
  const seek$: BehaviorSubject<number> = new BehaviorSubject<number>(params.seek ?? 0);
  const loop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.loop ?? false);
  const volume$: BehaviorSubject<number> = new BehaviorSubject<number>(volume ?? 1);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  // TODO 11.0.0: maybe the default threshold should be higher?
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.000001);

  const playSub$: Subscription = play$.pipe(distinctUntilChanged()).subscribe((isPlay: boolean): void => {
    if (isPlay) return void entity.play();
    else return void entity.stop();
  });

  const volumeSub$: Subscription = volume$
    .pipe(
      skipWhile((volume: number, index: number): boolean => index === 0 && volume === 1), // to avoid initial value (only if it's a default one)
      distinctUntilChanged()
    )
    .subscribe((volume: number): void => void entity.setVolume(volume));

  const pauseState = {
    isPaused: false,
    position: 0
  };

  const pauseSub$: Subscription = pause$
    .pipe(
      skipWhile((pause: boolean, index: number): boolean => index === 0 && !pause), // to avoid initial value (only if it's a default one)
      distinctUntilChanged()
    )
    .subscribe((isPause: boolean): void => {
      if (isPause && !pauseState.isPaused) {
        // eslint-disable-next-line functional/immutable-data
        pauseState.isPaused = true;
        // eslint-disable-next-line functional/immutable-data
        pauseState.position = entity.context.currentTime;
        play$.next(false);
      } else {
        // eslint-disable-next-line functional/immutable-data
        pauseState.isPaused = false;
        seek$.next(pauseState.position);
        play$.next(true);
      }
    });

  const speedSub$: Subscription = speed$
    .pipe(
      skipWhile((speed: number, index: number): boolean => index === 0 && speed === 1), // to avoid initial value (only if it's a default one)
      distinctUntilChanged()
    )
    .subscribe((speed: number): void => void entity.setPlaybackRate(speed));

  const seekSub$: Subscription = seek$
    .pipe(
      skipWhile((seek: number, index: number): boolean => index === 0 && seek === 0), // to avoid initial value (only if it's a default one)
      distinctUntilChanged()
    )
    .subscribe((seek: number): void => {
      seekAudio(entity, seek);
      // eslint-disable-next-line functional/immutable-data
      pauseState.position = seek;
    });

  const loopSub$: Subscription = loop$
    .pipe(
      skipWhile((loop: boolean, index: number): boolean => index === 0 && !loop), // to avoid initial value (only if it's a default one)
      distinctUntilChanged()
    )
    .subscribe((loop: boolean): void => void entity.setLoop(loop));

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
    playSub$.unsubscribe();
    pauseSub$.unsubscribe();
    driveToTargetConnector.destroy$.next();
    volumeSub$.unsubscribe();
    updateVolumeSub$.unsubscribe();
    speedSub$.unsubscribe();
    seekSub$.unsubscribe();
    loopSub$.unsubscribe();

    play$.complete();
    play$.unsubscribe();
    position$.complete();
    position$.unsubscribe();
    listener$.complete();
    listener$.unsubscribe();
    pause$.complete();
    pause$.unsubscribe();
    speed$.complete();
    speed$.unsubscribe();
    seek$.complete();
    seek$.unsubscribe();
    loop$.complete();
    loop$.unsubscribe();
    volume$.complete();
    volume$.unsubscribe();

    // TODO 11.0.0: guess we need to dispose PositionalAudio
  });

  return {
    ...wrapper,
    drive,
    play$,
    pause$,
    speed$,
    seek$,
    loop$,
    isPlaying: (): boolean => entity.isPlaying,
    getDuration: (): number | undefined => entity.buffer?.duration,
    stop: (): void => void entity.stop(),
    volume$,
    listener$,
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
