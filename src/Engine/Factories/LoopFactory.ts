import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import { LoopWrapper } from '@Engine/Wrappers/LoopWrapper';
import type { Factory, LoopParams } from '@Engine/Models';

const create = (params: LoopParams): ReturnType<typeof LoopWrapper> => LoopWrapper(params);

export const LoopFactory = (): Factory<ReturnType<typeof LoopWrapper>, LoopParams> => AbstractFactory(create);
