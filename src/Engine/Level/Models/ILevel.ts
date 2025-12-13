import type { Observable } from 'rxjs';

import type { IWithBuilt, LevelTag } from '@/Engine/Level';
import type { ILevelEntities } from '@/Engine/Level/Models';
import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';

export type ILevel = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  IWithTags<LevelTag> &
  Readonly<{
    name: string;
    start: () => void;
    stop: () => void;
    entities: ILevelEntities;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
