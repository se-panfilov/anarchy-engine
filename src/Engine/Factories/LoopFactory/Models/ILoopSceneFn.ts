import type { ICreateFN } from '@Engine/Factories';
import type { ILoopWrapper } from '@Engine/Wrappers';
import type { ILoopParams } from '@Engine/Models';

export type ILoopLoopFn = ICreateFN<ILoopWrapper, ILoopParams>;
