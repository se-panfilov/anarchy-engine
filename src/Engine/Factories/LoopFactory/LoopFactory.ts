import type { ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from '@Engine/Wrappers';
import { LoopWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigWrapperFactory } from '../AbstractFactory';
import type { ILoopFactory, ILoopLoopFn } from './Models';

const create: ILoopLoopFn = (params: ILoopParams): ILoopWrapper => LoopWrapper(params);

export const LoopFactory = (): ILoopFactory => AbstractFromConfigWrapperFactory('loop', create);
