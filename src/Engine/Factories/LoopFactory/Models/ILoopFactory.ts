import type { IAbstractFromConfigWrapperFactory, ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models';

export type ILoopFactory = IAbstractFromConfigWrapperFactory<ILoopWrapper, LoopFn, ILoopParams, void>;
