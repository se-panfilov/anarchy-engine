import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { ILoopFactory, ILoopParams, ILoopWrapper } from '../Models';
import { LoopWrapper } from '../Wrapper';

const factory: IReactiveFactory<ILoopWrapper, ILoopParams> = { ...ReactiveFactory(FactoryType.Loop, LoopWrapper) };
export const LoopFactory = (): ILoopFactory => ({ ...factory });
