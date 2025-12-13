import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { ILoopFactory, ILoopParams, ILoopWrapper } from '../Models';
import { LoopWrapper } from '../Wrapper';

const create = (params: ILoopParams): ILoopWrapper => LoopWrapper(params);
export const LoopFactory = (): ILoopFactory => ({ ...AbstractFactory('loop'), create });
