import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ILoopParams, ILoopWrapper } from '@Engine/Domains/Loop/Models';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
