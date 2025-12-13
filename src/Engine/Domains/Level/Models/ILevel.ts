import type { Observable } from 'rxjs';

import type { IWithBuilt, LevelTag } from '@/Engine/Domains/Level';
import type { ILevelEntities } from '@/Engine/Domains/Level/Models';
import type { ILoopWrapper } from '@/Engine/Domains/Loop';
import type { IDestroyable, IWithMessages, IWithTags } from '@/Engine/Mixins';

export type ILevel = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  IWithTags<LevelTag> &
  Readonly<{
    name: string;
    start: () => ILoopWrapper;
    stop: () => void;
    entities: ILevelEntities;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
