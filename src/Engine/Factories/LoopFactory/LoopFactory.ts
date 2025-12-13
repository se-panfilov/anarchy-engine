import type { ILoopFactory, ILoopLoopFn } from './Models';
import { AbstractFactory } from '../AbstractFactory';
import type { ILoopWrapper } from '@Engine/Wrappers';
import { LoopWrapper } from '@Engine/Wrappers';
import type { LoopParams } from '@Engine/Models';

const create: ILoopLoopFn = (params: LoopParams): ILoopWrapper => LoopWrapper(params);

export const LoopFactory = (): ILoopFactory => AbstractFactory('loop', create);
