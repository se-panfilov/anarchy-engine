import type { ILoopWrapper } from '@Engine/Domains/Loop';
import type { Observable } from 'rxjs';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { ILevelFactory, ILevelRegistry, IWithBuilt, LevelTag } from '@/Engine/Domains/Level';
import type { IDestroyable } from '@/Engine/Domains/Mixins';

export type ILevel = IDestroyable &
  Omit<IWithBuilt, 'built$'> &
  Readonly<{
    name: string;
    start: () => ILoopWrapper;
    stop: () => void;
    registry: ILevelRegistry;
    factory: ILevelFactory;
    tags: ReadonlyArray<LevelTag | CommonTag | string>;
    built$: Observable<void>;
    isBuilt: () => boolean;
  }>;
