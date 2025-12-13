import type {
  TAbstractAudioWrapper,
  TAudio3dParams,
  TAudio3dPerformanceOptions,
  TAudio3dTransformDrive,
  TAudio3dWrapper,
  TAudioCreateFn,
  TAudioWrapperDependencies
} from '@Anarchy/Engine/Audio/Models';
import { Audio3dTransformDrive } from '@Anarchy/Engine/Audio/TransformDrive';
import { createPositionalAudio, onAudioPositionUpdate } from '@Anarchy/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@Anarchy/Engine/Audio/Wrappers/AbstractAudioWrapper';
import { LoopUpdatePriority } from '@Anarchy/Engine/Loop';
import type { TMeters, TMilliseconds } from '@Anarchy/Engine/Math';
import { meters } from '@Anarchy/Engine/Measurements';
import type { TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@Anarchy/Engine/TransformDrive';
import { DriveToTargetConnector } from '@Anarchy/Engine/TransformDrive';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, sample, takeUntil } from 'rxjs';
import type { AudioListener, PositionalAudio, Vector3Like } from 'three';

export function Audio3dWrapper(params: TAudio3dParams, { audioLoop, transformDriveService }: TAudioWrapperDependencies): TAudio3dWrapper {
  const { performance } = params;
  const directionalCone$: BehaviorSubject<Vector3Like | undefined> = new BehaviorSubject<Vector3Like | undefined>(params.directionalCone);
  const wrapper: TAbstractAudioWrapper<PositionalAudio> = AbstractAudioWrapper(params, createPositionalAudio as TAudioCreateFn<PositionalAudio>);
  const listener$: BehaviorSubject<AudioListener | undefined> = new BehaviorSubject<AudioListener | undefined>(params.listener);

  directionalCone$
    .pipe(
      takeUntil(wrapper.destroy$),
      distinctUntilChanged((prev: Vector3Like | undefined, curr: Vector3Like | undefined): boolean => prev?.x === curr?.x && prev?.y === curr?.y && prev?.z === curr?.z)
    )
    .subscribe((directionalCone: Vector3Like | undefined): void => {
      if (isDefined(directionalCone)) wrapper.entity.setDirectionalCone(directionalCone.x, directionalCone.y, directionalCone.z);
    });

  const updatePriority: LoopUpdatePriority = performance?.updatePriority ?? LoopUpdatePriority.LOW;
  const noiseThreshold: TMeters = performance?.noiseThreshold ?? meters(0.01);

  const drive: TAudio3dTransformDrive = Audio3dTransformDrive(params, { transformDriveService }, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, wrapper.entity);

  const sourcePositionUpdate$: Observable<TReadonlyVector3> = onAudioPositionUpdate(drive.position$, noiseThreshold);

  const tickFiltered$: Observable<TMilliseconds> = audioLoop.tick$.pipe(filter((): boolean => audioLoop.shouldUpdateWithPriority(updatePriority)));

  sourcePositionUpdate$.pipe(sample(tickFiltered$), takeUntil(wrapper.destroy$)).subscribe((position: TReadonlyVector3): void => {
    void wrapper.entity.position.copy(position);
    wrapper.entity.updateMatrix();
    wrapper.entity.updateMatrixWorld(true);
  });

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    // eslint-disable-next-line functional/immutable-data
    if (listener$.value) listener$.value.context = null as any;
    // eslint-disable-next-line functional/immutable-data
    if (listener$.value) listener$.value.gain = null as any;
    listener$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, {
    drive,
    driveToTargetConnector,
    listener$,
    directionalCone$,
    getPerformance: (): TAudio3dPerformanceOptions | undefined => performance
  });
}
