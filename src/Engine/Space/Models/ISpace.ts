import type { Observable } from 'rxjs';

import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';
import type { IWithBuilt } from '@/Engine/Space';
import type { ISpaceEntities } from '@/Engine/Space/Models';

export type ISpace = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  IWithTags<string> &
  Readonly<{
    name: string;
    start: () => void;
    stop: () => void;
    entities: ISpaceEntities;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
