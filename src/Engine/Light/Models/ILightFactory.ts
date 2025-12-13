import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { ILightConfig, ILightParams, ILightWrapper } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ILightFactory = IReactiveFactory<ILightWrapper, ILightParams> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
