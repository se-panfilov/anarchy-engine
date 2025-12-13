import type { Observable } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, sample, tap } from 'rxjs';
import type { Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TReadonlyVector3 } from '@/Engine';
import { isEqualOrSimilarByXyzCoords } from '@/Engine';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAudio3dParams, TAudio3dWrapper } from '@/Engine/Audio/Models';

// TODO 11.0.0: add destroy$
export function Audio3dWrapper({ sound, position, name }: TAudio3dParams): TAudio3dWrapper {
  const entity: Howl = sound;
  const position$: BehaviorSubject<Vector3Like> = new BehaviorSubject<Vector3Like>(position);

  // private sound: Howl;
  // private position: [number, number, number];
  // private listenerPos: [number, number, number];
  // position = position;
  // listenerPos = [0, 0, 0];

  // sound = new Howl({
  //   src: [src],
  //   volume: 1.0
  // });

  const result = {
    ...AbstractWrapper(entity, WrapperType.Audio3d),
    getName: (): string => name
  };

  position$
    // TODO 11.0.0: Add distinctUntilChanged
    .pipe(distinctUntilChanged((_prev: Vector3Like, curr: Vector3Like): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, noiseThreshold ?? 0)))
    .subscribe((): void => {
      updateVolume();
    });

  function updateListenerPosition(listenerPos: Vector3Like): void {
    if (distance(listenerPos, this.listenerPos) > updateThreshold) {
      listenerPos = listenerPos;
      updateVolume();
    }
  }

  function updateSourcePosition(pos: Vector3Like) {
    if (distance(pos, this.pos) > this.updateThreshold) {
      this.pos = pos;
      this.updateVolume();
    }
  }

  function updateVolume() {
    const distance = distance(this.pos, this.listenerPos);
    // then farther, the quieter
    const volume = Math.max(0, 1 - distance / 20);
    sound.volume(volume);
  }

  function distance(a: Vector3Like, b: Vector3Like) {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  }

  const play = () => sound.play();

  return result;
}

function spatialPositionUpdate(audioLoop: TAudioLoop, position$: BehaviorSubject<TReadonlyVector3>, noiseThreshold?: number): Observable<Readonly<Vector3>> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return position$.pipe(
    distinctUntilChanged((_prev: Vector3, curr: Vector3): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, noiseThreshold ?? 0)),
    tap((value: Vector3): void => {
      // eslint-disable-next-line functional/immutable-data
      prevValue[0] = value.x;
      // eslint-disable-next-line functional/immutable-data
      prevValue[1] = value.y;
      // eslint-disable-next-line functional/immutable-data
      prevValue[2] = value.z;
    }),
    sample(audioLoop.tick$)
  );
}
