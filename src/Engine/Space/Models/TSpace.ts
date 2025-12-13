import type { Observable } from 'rxjs';

import type { TDestroyable, TWithName, TWithTags } from '@/Engine/Mixins';

import type { TSpaceLoops } from './TSpaceLoops';
import type { TSpaceServices } from './TSpaceServices';
import type { TWithBuilt } from './TWithBuilt';

export type TSpace = TDestroyable &
  Omit<TWithBuilt, 'built$'> &
  TWithTags &
  TWithName &
  Readonly<{
    services: TSpaceServices;
    loops: TSpaceLoops;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
