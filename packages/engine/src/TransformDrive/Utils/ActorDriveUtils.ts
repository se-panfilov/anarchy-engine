import type { Subject } from 'rxjs';

import type { TVector3OrEuler, TVector4OrQuaternion } from '@/ThreeLib';
import type { TWriteable } from '@/Utils';

export function getXyzUpdateProxy<T extends TVector3OrEuler>(coordsObj: TWriteable<TVector3OrEuler>, subj$: Subject<T>): TVector3OrEuler {
  return new Proxy(coordsObj, {
    set(target: TWriteable<TVector3OrEuler>, prop: string, value: number): boolean {
      if (prop === 'x' || prop === 'y' || prop === 'z') {
        // eslint-disable-next-line functional/immutable-data
        target[prop] = value;
        subj$.next(target.clone() as T);
      }
      return true;
    }
  });
}

export function getXyzwUpdateProxy<T extends TVector4OrQuaternion>(coordsObj: TWriteable<TVector4OrQuaternion>, subj$: Subject<T>): TVector4OrQuaternion {
  return new Proxy(coordsObj, {
    set(target: TWriteable<TVector4OrQuaternion>, prop: string, value: number): boolean {
      if (prop === 'x' || prop === 'y' || prop === 'z' || prop === 'w') {
        // eslint-disable-next-line functional/immutable-data
        target[prop] = value;
        subj$.next(target.clone() as T);
      }
      return true;
    }
  });
}
