import type { IAbstractFromConfigFactory, ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models';

export type ILoopFactory = IAbstractFromConfigFactory<ILoopWrapper, LoopFn, ILoopParams, void>;
