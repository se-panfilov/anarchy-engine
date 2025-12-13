import type { Observable } from 'rxjs';

import type { IDestroyable, IWithTagsMixin } from '@/Engine/Mixins';
import type { ISpaceServices, IWithBuilt } from '@/Engine/Space';

export type ISpace = IDestroyable &
  Omit<IWithBuilt, 'built$'> &
  IWithTagsMixin &
  Readonly<{
    name: string;
    services: ISpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
