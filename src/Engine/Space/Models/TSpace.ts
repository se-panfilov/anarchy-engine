import type { Observable } from 'rxjs';

import type { TDestroyable, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSpaceServices, TWithBuilt } from '@/Engine/Space';

export type TSpace = TDestroyable &
  Omit<TWithBuilt, 'built$'> &
  TWithTags &
  TWithName &
  Readonly<{
    services: TSpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
