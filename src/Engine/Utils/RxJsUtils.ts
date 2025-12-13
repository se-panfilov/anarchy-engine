import type { Subject } from 'rxjs';
import type { Vector2Like, Vector4Like } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import { isDefined } from '@/Engine/Utils';

import type { TWriteable } from './TypesUtils';

export function updateSubjOnChange<T extends Record<K, V>, K extends keyof T, V>(obj: T, fieldName: K, subj$: Subject<T[K]>, beforeApplyFn?: (v: T[K]) => T[K]): T {
  return new Proxy(obj, {
    set(target: TWriteable<T>, prop: string, value: T[K]): boolean {
      const isTargetField: boolean = fieldName === prop;
      const val: T[K] = isTargetField && isDefined(beforeApplyFn) ? beforeApplyFn(value) : value;
      // eslint-disable-next-line functional/immutable-data
      target[prop as K] = val;
      if (isTargetField) subj$.next(val);
      return true;
    }
  });
}

export function isEqualOrSimilarNumbers(prev: number, curr: number, threshold: number = 0): boolean {
  return Math.abs(curr - prev) <= threshold;
}

export function isEqualOrSimilarVector4Like(prev: Vector4Like, curr: Vector4Like, threshold: number): boolean {
  return isEqualOrSimilarVector3Like(prev, curr, threshold) && differenceSmallerThan(curr.w, prev.w, threshold);
}

export function isEqualOrSimilarVector3Like(prev: Vector3Like, curr: Vector3Like, threshold: number): boolean {
  return isEqualOrSimilarVector2Like(prev, curr, threshold) && differenceSmallerThan(curr.z, prev.z, threshold);
}

export function isEqualOrSimilarVector3WithCoords(x: number, y: number, z: number, curr: Vector3Like, threshold: number): boolean {
  return differenceSmallerThan(curr.x, x, threshold) && differenceSmallerThan(curr.y, y, threshold) && differenceSmallerThan(curr.z, z, threshold);
}

export function isEqualOrSimilarVector2Like(prev: Vector2Like, curr: Vector2Like, threshold: number): boolean {
  return differenceSmallerThan(curr.x, prev.x, threshold) && differenceSmallerThan(curr.y, prev.y, threshold);
}

function differenceSmallerThan(a: number, b: number, value: number): boolean {
  return Math.abs(a - b) <= value;
}
