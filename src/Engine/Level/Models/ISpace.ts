import type { Observable } from 'rxjs';

import type { IWithBuilt } from '@/Engine/Level';
import type { ISpaceEntities } from '@/Engine/Level/Models';
import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';

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
