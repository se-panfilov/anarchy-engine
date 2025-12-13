import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILight, ILightConfig, ILightParams } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ILightFactory = IReactiveFactory<IAbstractLightWrapper<ILight>, ILightParams> & IParamsFromConfig<ILightConfig, ILightParams> & IDestroyable;
