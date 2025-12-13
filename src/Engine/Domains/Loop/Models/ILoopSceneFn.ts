import type { ICreateFN } from '@Engine/Factories';
import type { ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
