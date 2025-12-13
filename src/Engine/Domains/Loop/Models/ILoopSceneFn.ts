import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { ILoopParams } from './ILoopParams';
import type { ILoopWrapper } from './ILoopWrapper';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
