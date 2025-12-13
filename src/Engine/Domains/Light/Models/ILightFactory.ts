import type { IParamsFromConfig, IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IReactiveFactory<ILightWrapper, ILightParams> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
