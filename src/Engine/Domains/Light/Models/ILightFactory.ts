import type { IParamsFromConfig, IReactiveFactory } from '@Engine/Domains/Abstract';

import type { ILightConfig, ILightParams, ILightWrapper } from '@/Engine/Domains/Light/Models';
import type { IDestroyable } from '@/Engine/Domains/Mixins';

export type ILightFactory = IReactiveFactory<ILightWrapper, ILightParams> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
