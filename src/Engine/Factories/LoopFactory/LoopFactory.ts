import type { ILoopFactory, ILoopLoopFn } from './Models';
import { AbstractFactory } from '../AbstractFactory';
import { LoopWrapper } from '@Engine/Wrappers';
import type { LoopParams } from '@Engine/Models';

const create: ILoopLoopFn = (params: LoopParams): ReturnType<typeof LoopWrapper> => LoopWrapper(params);

export const LoopFactory = (): ILoopFactory => AbstractFactory('loop', create);
