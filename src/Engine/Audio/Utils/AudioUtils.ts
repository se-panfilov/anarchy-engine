import type { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs';
import { Audio, PositionalAudio } from 'three';

import type { TAnyAudio, TAnyAudioConfig, TAnyAudioParams, TAnyAudioWrapper, TAudio3dConfig, TAudio3dParams, TAudio3dWrapper, TAudioParams } from '@/Engine/Audio/Models';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import { isDefined, isEqualOrSimilarByXyzCoords, isNotDefined } from '@/Engine/Utils';

export const isAudio3dConfig = (config: TAnyAudioConfig): config is TAudio3dConfig => isDefined((config as TAudio3dConfig).position);
export const isAudio3dParams = (config: TAnyAudioParams): config is TAudio3dParams => isDefined((config as TAudio3dParams).position);
export const isAudio3dWrapper = (wrapper: TAnyAudioWrapper): wrapper is TAudio3dWrapper => isDefined((wrapper as TAudio3dWrapper).position$);

export function seekAudio(entity: TAnyAudio, time: number): void {
  if (!entity.buffer) return;
  entity.stop();
  // eslint-disable-next-line functional/immutable-data
  entity.offset = time;
  entity.play();
}

export function createPositionalAudio(audioSource: AudioBuffer, params: TAudio3dParams): PositionalAudio | never {
  if (isNotDefined(params.listener)) throw new Error('Audio: cannot create positional audio without a listener');
  const audio = new PositionalAudio(params.listener);

  audio.setBuffer(audioSource!);
  audio.setRefDistance(params.refDistance ?? 1);
  audio.setVolume(params.volume ?? 1);
  audio.setLoop(params.loop ?? false);
  if (params.rolloffFactor) audio.setRolloffFactor(params.rolloffFactor);
  audio.setDistanceModel(params.distanceModel ?? 'linear');
  if (params.maxDistance) audio.setMaxDistance(params.maxDistance);
  if (params.directionalCone) audio.setDirectionalCone(params.directionalCone.x, params.directionalCone.y, params.directionalCone.z);
  return audio;
}

export function createAudio(audioSource: AudioBuffer, params: TAudioParams): Audio {
  if (isNotDefined(params.listener)) throw new Error('Audio: cannot create positional audio without a listener');
  const audio = new Audio(params.listener);
  audio.setBuffer(audioSource);
  audio.setLoop(params.loop ?? false);
  audio.setVolume(params.volume ?? 1);
  return audio;
}

export function onAudioPositionUpdate(position$: BehaviorSubject<TReadonlyVector3>, noiseThreshold?: number): Observable<TReadonlyVector3> {
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
