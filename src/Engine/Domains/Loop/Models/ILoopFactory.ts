import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { LoopFn, ILoopParams, ILoopWrapper } from '@Engine/Domains/Loop';

export type ILoopFactory = IAbstractFromConfigWrapperFactory<ILoopWrapper, LoopFn, ILoopParams, void, IAbstractFactory<ILoopWrapper, ILoopParams>>;
