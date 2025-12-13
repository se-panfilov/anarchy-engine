import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin } from '@Engine/Domains/Abstract';

import type { ILoopFactory, ILoopParams, ILoopWrapper } from '../Models';
import { LoopWrapper } from '../Wrapper';

const create = (params: ILoopParams): ILoopWrapper => LoopWrapper(params);
const factory: IFactory<ILoopWrapper, ILoopParams> = { ...AbstractFactory('loop'), create };
export const LoopFactory = (): ILoopFactory => ({ ...factory, ...destroyableFactoryMixin(factory) });
