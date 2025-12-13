import { AbstractFactory, CreateFN } from './AbstractFactory';
import { ILoopWrapper, LoopWrapper } from '@Engine/Wrappers';
import type { Factory, LoopParams } from '@Engine/Models';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';

const create: CreateFN<ReturnType<typeof LoopWrapper>, LoopParams> = (
  params: LoopParams
): ReturnType<typeof LoopWrapper> => LoopWrapper(params);

export const LoopFactory = (): Factory<ILoopWrapper, LoopFn, LoopParams> => AbstractFactory('loop', create);
