import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, sample, tap } from 'rxjs';
import type { AudioListener, PositionalAudio } from 'three';

import type { TAbstractAudioWrapper, TAudio3dParams, TAudio3dTransformDrive, TAudio3dWrapper, TAudioCreateFn, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@/Engine/Audio/TransformDrive';
import { createPositionalAudio } from '@/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@/Engine/Audio/Wrappers/AbstractAudioWrapper';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function Audio3dWrapper(params: TAudio3dParams, { audioLoop }: TAudioWrapperDependencies): TAudio3dWrapper {
  const { position, performance } = params;
  const wrapper: TAbstractAudioWrapper<PositionalAudio> = AbstractAudioWrapper(params, createPositionalAudio as TAudioCreateFn<PositionalAudio>);
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(position);
  const listener$: BehaviorSubject<AudioListener | undefined> = new BehaviorSubject<AudioListener | undefined>(params.listener);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  // TODO 11.0.0: maybe the default threshold should be higher?
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.000001);

  const sourcePositionUpdate$: Observable<TReadonlyVector3> = onPositionUpdate(position$, noiseThreshold);

  const updateVolumeSub$: Subscription = sourcePositionUpdate$
    .pipe(
      sample(audioLoop.tick$),
      filter((): boolean => audioLoop.shouldUpdateWithPriority(updatePriority))
    )
    .subscribe((position: TReadonlyVector3): void => void wrapper.entity.position.copy(position));

  const drive: TAudio3dTransformDrive = Audio3dTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, wrapper.entity);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    driveToTargetConnector.destroy$.next();
    updateVolumeSub$.unsubscribe();

    position$.complete();
    position$.unsubscribe();
  });

  return {
    ...wrapper,
    drive,
    listener$,
    position$
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
