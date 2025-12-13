import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, IAnyLightConfig, ILight, ILightParams } from '@/Engine/Light/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ILightFactory = IReactiveFactory<IAbstractLightWrapper<ILight>, ILightParams> & IParamsFromConfig<IAnyLightConfig, ILightParams> & IDestroyable;
