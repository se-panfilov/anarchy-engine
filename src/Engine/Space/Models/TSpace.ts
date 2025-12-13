import type { Observable } from 'rxjs';

import type { TWithTagsMixin, TDestroyable } from '@/Engine/Mixins';
import type { TSpaceServices, TWithBuilt } from '@/Engine/Space';

export type TSpace = TDestroyable &
  Omit<TWithBuilt, 'built$'> &
  TWithTagsMixin &
  Readonly<{
    name: string;
    services: TSpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
