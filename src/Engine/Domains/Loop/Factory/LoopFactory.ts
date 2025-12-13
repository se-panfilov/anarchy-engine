import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ILoopFactory, ILoopLoopFn, ILoopParams, ILoopWrapper } from '@Engine/Domains/Loop/Models';
import { LoopWrapper } from '@Engine/Domains/Loop/Wrapper';

const create: ILoopLoopFn = (params: ILoopParams): ILoopWrapper => LoopWrapper(params);

export const LoopFactory = (): ILoopFactory => AbstractFromConfigWrapperFactory('loop', create);
