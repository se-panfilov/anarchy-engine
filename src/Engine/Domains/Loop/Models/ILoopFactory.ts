import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';

import type { ILoopParams } from './ILoopParams';
import type { ILoopWrapper } from './ILoopWrapper';
import type { LoopFn } from './LoopFn';

export type ILoopFactory = IAbstractFromConfigWrapperFactory<ILoopWrapper, LoopFn, ILoopParams, void, IAbstractFactory<ILoopWrapper, ILoopParams>>;
