import type { CreateFN } from '@Engine/Factories';
import type { LoopWrapper } from '@Engine/Wrappers';
import type { ILoopParams } from '@Engine/Models';

export type ILoopLoopFn = CreateFN<ReturnType<typeof LoopWrapper>, ILoopParams>;
