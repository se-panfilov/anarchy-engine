import type { Observable } from 'rxjs';

import type { TDestroyable, TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TSpaceServices, TWithBuilt } from '@/Engine/Space';

export type TSpace = TDestroyable &
  Omit<TWithBuilt, 'built$'> &
  TWithReadonlyTags &
  TWithName &
  Readonly<{
    services: TSpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
