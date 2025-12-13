import type { Observable } from 'rxjs';

import type { TDestroyable, TWithName, TWithTagsMixin } from '@/Engine/Mixins';
import type { TSpaceServices, TWithBuilt } from '@/Engine/Space';

export type TSpace = TDestroyable &
  Omit<TWithBuilt, 'built$'> &
  TWithTagsMixin &
  TWithName &
  Readonly<{
    services: TSpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
