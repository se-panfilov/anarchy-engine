import type { Howl } from 'howler';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, sample, Subject, tap } from 'rxjs';
import { Vector3 } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { DriveToAudio3dConnector } from '@/Engine/Audio/Connectors';
import type { TAudio3dParams, TAudio3dTransformDrive, TAudio3dWrapper, TAudio3dWrapperDependencies, TAudioLoop } from '@/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@/Engine/Audio/TransformDrive';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function Audio3dWrapper(params: TAudio3dParams, { loopService }: TAudio3dWrapperDependencies): TAudio3dWrapper {
  const { sound, volume, position, performance } = params;
  const entity: Howl = sound;
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(position);
  const listenerPosition$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(new Vector3());

  const pause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.pause ?? false);
  const mute$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.mute ?? false);
  const fade$: Subject<Readonly<{ from: number; to: number; duration: number }>> = new Subject<Readonly<{ from: number; to: number; duration: number }>>();
  const speed$: BehaviorSubject<number> = new BehaviorSubject<number>(params.speed ?? 1);
  const seek$: BehaviorSubject<number> = new BehaviorSubject<number>(params.seek ?? 0);
  const loop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.loop ?? false);
  const volume$: BehaviorSubject<number> = new BehaviorSubject<number>(volume);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  // TODO 11.0.0: maybe the default threshold should be higher?
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.000001);

  const volumeSub: Subscription = volume$.pipe(distinctUntilChanged()).subscribe((volume: number): void => void entity.volume(volume));

  const audioLoop: TAudioLoop = loopService.getAudioLoop();

  const sourcePositionUpdate$: Observable<TReadonlyVector3> = onPositionUpdate(position$, noiseThreshold);
  const listenerPositionUpdate$: Observable<TReadonlyVector3> = onPositionUpdate(listenerPosition$, noiseThreshold);

  const updateVolumeSub$: Subscription = combineLatest([sourcePositionUpdate$, listenerPositionUpdate$])
    .pipe(
      sample(audioLoop.tick$),
      // TODO 11.0.0: check filter logic
      filter((): boolean => updatePriority >= audioLoop.priority$.value)
    )
    .subscribe(([sourcePosition, listenerPos]: [TReadonlyVector3, TReadonlyVector3]): void => {
      volume$.next(calculateVolume(sourcePosition, listenerPos));
      const relativePos: TReadonlyVector3 = sourcePosition.clone().sub(listenerPos);
      entity.pos(relativePos.x, relativePos.y, relativePos.z);
    });

  function calculateVolume(sourcePosition: TReadonlyVector3, listenerPos: TReadonlyVector3): number {
    const distance: TMeters = sourcePosition.distanceTo(listenerPos) as TMeters;

    // then farther, the quieter
    const refDistance = 1;
    return Math.max(0, 1 / (1 + Math.pow(distance / refDistance, 2)));
  }

  const wrapper: TWrapper<Howl> = AbstractWrapper(entity, WrapperType.Audio3d, params);
  const drive: TAudio3dTransformDrive = Audio3dTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToAudio3dConnector(drive, entity);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    driveToTargetConnector.destroy$.next();

    volumeSub.unsubscribe();
    updateVolumeSub$.unsubscribe();

    position$.complete();
    position$.unsubscribe();

    pause$.complete();
    pause$.unsubscribe();
    mute$.complete();
    mute$.unsubscribe();
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
    mute$,
    fade$,
    speed$,
    seek$,
    loop$,
    isPlaying: (): boolean => entity.playing(),
    getDuration: (): number => entity.duration(),
    getState: (): 'unloaded' | 'loading' | 'loaded' => entity.state(),
    load: (): void => void entity.load(),
    unload: (): void => {
      void entity.unload();
      destroyable.destroy$.next();
    },
    stop: (): Howl => entity.stop(),
    volume$,
    position$,
    listenerPosition$,
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
