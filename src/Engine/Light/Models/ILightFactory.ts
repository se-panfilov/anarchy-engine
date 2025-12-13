import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, IAmbientLightParams, ILight, ILightConfig } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ILightFactory = IReactiveFactory<IAbstractLightWrapper<ILight>, IAmbientLightParams> & IParamsFromConfig<ILightConfig, IAmbientLightParams> & IDestroyable;
