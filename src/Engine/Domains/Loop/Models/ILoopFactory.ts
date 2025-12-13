import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ILoopParams, ILoopWrapper, LoopFn } from '@Engine/Domains/Loop';

export type ILoopFactory = IAbstractFromConfigWrapperFactory<ILoopWrapper, LoopFn, ILoopParams, void, IAbstractFactory<ILoopWrapper, ILoopParams>>;
