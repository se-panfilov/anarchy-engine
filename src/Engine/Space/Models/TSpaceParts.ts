import type { BehaviorSubject } from 'rxjs';

import type { TSpaceLoops } from './TSpaceLoops';
import type { TSpaceServices } from './TSpaceServices';

export type TSpaceParts = Readonly<{
  services: TSpaceServices;
  loops: TSpaceLoops;
  built$: BehaviorSubject<boolean>;
}>;
