import type { Observable } from 'rxjs';

import type { TSpaceLoops } from './TSpaceLoops';
import type { TSpaceServices } from './TSpaceServices';

export type TSpaceEntities = Readonly<{
  services: TSpaceServices;
  loops: TSpaceLoops;
  built$: Observable<void>;
  isBuilt: () => boolean;
}>;
