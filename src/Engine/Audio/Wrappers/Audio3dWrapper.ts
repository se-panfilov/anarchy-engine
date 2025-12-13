import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, filter, sample } from 'rxjs';
import type { AudioListener, PositionalAudio } from 'three';

import type { TAbstractAudioWrapper, TAudio3dParams, TAudio3dTransformDrive, TAudio3dWrapper, TAudioCreateFn, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@/Engine/Audio/TransformDrive';
import { createPositionalAudio, onAudioPositionUpdate } from '@/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@/Engine/Audio/Wrappers/AbstractAudioWrapper';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';

export function Audio3dWrapper(params: TAudio3dParams, { audioLoop }: TAudioWrapperDependencies): TAudio3dWrapper {
  const { position, performance } = params;
  const wrapper: TAbstractAudioWrapper<PositionalAudio> = AbstractAudioWrapper(params, createPositionalAudio as TAudioCreateFn<PositionalAudio>);
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(position);
  const listener$: BehaviorSubject<AudioListener | undefined> = new BehaviorSubject<AudioListener | undefined>(params.listener);

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.01);

  const sourcePositionUpdate$: Observable<TReadonlyVector3> = onAudioPositionUpdate(position$, noiseThreshold);

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
