import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { ILoopFactory, ILoopParams, ILoopWrapper } from '@/Engine/Domains/Loop/Models';
import { LoopWrapper } from '@/Engine/Domains/Loop/Wrapper';

const factory: IReactiveFactory<ILoopWrapper, ILoopParams> = { ...ReactiveFactory(FactoryType.Loop, LoopWrapper) };
export const LoopFactory = (): ILoopFactory => ({ ...factory });
