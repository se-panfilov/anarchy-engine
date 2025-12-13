import type { IFactory, ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models';

export type ILoopFactory = IFactory<ILoopWrapper, LoopFn, ILoopParams, void>;
