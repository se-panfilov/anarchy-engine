import type { LoopFn } from '@Engine/Domains/Loop/Models/LoopFn';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Domains/Loop/Models/ILoopWrapper';
import type { ILoopParams } from '@Engine/Domains/Loop/Models/ILoopParams';

export type ILoopFactory = IAbstractFromConfigWrapperFactory<ILoopWrapper, LoopFn, ILoopParams, void>;
