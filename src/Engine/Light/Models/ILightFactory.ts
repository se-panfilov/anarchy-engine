import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, IAnyLightConfig, ILight, ILightParams } from '@/Engine/Light/Models';
import type { TDestroyable } from '@/Engine/Mixins';

export type ILightFactory = TReactiveFactory<IAbstractLightWrapper<ILight>, ILightParams> & TParamsFromConfig<IAnyLightConfig, ILightParams> & TDestroyable;
