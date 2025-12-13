import { AbstractFactory } from './AbstractFactory';
import { LoopWrapper } from '@Engine/Wrappers';
import type { Factory, LoopParams } from '@Engine/Models';

const create = (params: LoopParams): ReturnType<typeof LoopWrapper> => LoopWrapper(params);

export const LoopFactory = (): Factory<ReturnType<typeof LoopWrapper>, LoopParams> => AbstractFactory('loop', create);
