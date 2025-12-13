import type { Observable } from 'rxjs';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IWithBuilt, LevelTag } from '@/Engine/Domains/Level';
import type { ILevelEntities } from '@/Engine/Domains/Level/Models';
import type { ILoopWrapper } from '@/Engine/Domains/Loop';
import type { IDestroyable, IWithMessages } from '@/Engine/Mixins';

export type ILevel = IDestroyable &
  IWithMessages &
  Omit<IWithBuilt, 'built$'> &
  Readonly<{
    name: string;
    start: () => ILoopWrapper;
    stop: () => void;
    entities: ILevelEntities;
    tags: ReadonlyArray<LevelTag | CommonTag | string>;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
