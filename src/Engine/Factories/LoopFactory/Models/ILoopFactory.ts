import type { Factory, LoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';

export type ILoopFactory = Factory<ILoopWrapper, LoopFn, LoopParams>;
