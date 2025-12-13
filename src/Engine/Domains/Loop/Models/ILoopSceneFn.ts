import type { ICreateFN } from '@Engine/Factories';
import type { ILoopWrapper, ILoopParams } from '@Engine/Domains/Loop/Models';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
