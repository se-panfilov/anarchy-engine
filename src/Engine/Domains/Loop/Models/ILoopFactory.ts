import type { IFactory } from '@Engine/Domains/Abstract';

import type { ILoopParams } from './ILoopParams';
import type { ILoopWrapper } from './ILoopWrapper';

export type ILoopFactory = IFactory<ILoopWrapper, ILoopParams>;
