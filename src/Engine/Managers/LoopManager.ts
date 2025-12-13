import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import { LoopWrapper } from '@Engine/Wrappers/LoopWrapper';
import type { LoopParams } from '@Engine/Models/LoopParams';
import type { Factory } from '@Engine/Models/Factory';

const create = (params: LoopParams): ReturnType<typeof LoopWrapper> => LoopWrapper(params);

export const LoopFactory = (): Factory<ReturnType<typeof LoopWrapper>, LoopParams> => AbstractFactory(create);
