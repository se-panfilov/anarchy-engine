import type { IFactory, IParamsFromConfig, IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IFactory<ILightWrapper, ILightParams> & IReactiveFactory<ILightWrapper> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
