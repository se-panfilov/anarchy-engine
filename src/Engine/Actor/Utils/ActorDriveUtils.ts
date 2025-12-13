import type { Subject } from 'rxjs';

import type { TVector3OrEuler } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';

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
