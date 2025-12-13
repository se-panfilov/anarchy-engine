import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { ILoopParams } from './ILoopParams';
import type { ILoopWrapper } from './ILoopWrapper';

export type ILoopFactory = IReactiveFactory<ILoopWrapper, ILoopParams> & IDestroyable;
