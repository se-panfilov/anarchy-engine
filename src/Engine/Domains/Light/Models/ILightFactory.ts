import type { IFactory, IParamsFromConfig } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IFactory<ILightWrapper, ILightParams> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
