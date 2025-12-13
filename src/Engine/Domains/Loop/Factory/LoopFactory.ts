import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { ILoopFactory, ILoopLoopFn, ILoopParams, ILoopWrapper } from '../Models';
import { LoopWrapper } from '../Wrapper';

const create: ILoopLoopFn = (params: ILoopParams): ILoopWrapper => LoopWrapper(params);

export const LoopFactory = (): ILoopFactory => AbstractFromConfigWrapperFactory('loop', create);
