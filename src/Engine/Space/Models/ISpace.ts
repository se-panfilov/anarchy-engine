import type { Observable } from 'rxjs';

import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';
import type { ISpaceServices, IWithBuilt } from '@/Engine/Space';

export type ISpace = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  IWithTags<string> &
  Readonly<{
    name: string;
    start: () => void;
    stop: () => void;
    services: ISpaceServices;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
