import type { BehaviorSubject, Observable } from 'rxjs';

import type { TSpace } from './TSpace';
import type { TSpaceLoops } from './TSpaceLoops';
import type { TSpaceServices } from './TSpaceServices';

export type TSpaceParts = Readonly<{
  services: TSpaceServices;
  loops: TSpaceLoops;
  built$: Observable<TSpace>;
  start$: BehaviorSubject<boolean>;
}>;
