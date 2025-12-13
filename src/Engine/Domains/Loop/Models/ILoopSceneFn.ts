import type { ILoopParams, ILoopWrapper } from '@Engine/Domains/Loop/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
