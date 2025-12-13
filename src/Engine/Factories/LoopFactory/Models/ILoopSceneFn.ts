import type { ICreateFN } from '@Engine/Factories';
import type { LoopWrapper } from '@Engine/Wrappers';
import type { ILoopParams } from '@Engine/Models';

export type ILoopLoopFn = ICreateFN<ReturnType<typeof LoopWrapper>, ILoopParams>;
