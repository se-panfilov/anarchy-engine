import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, IAmbientLightParams, ILightConfig } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ILightFactory = IReactiveFactory<IAbstractLightWrapper, IAmbientLightParams> & IParamsFromConfig<ILightConfig, IAmbientLightParams> & IDestroyable;
