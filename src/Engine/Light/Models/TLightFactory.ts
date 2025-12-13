import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightParams, TLightServiceDependencies } from '@/Engine/Light/Models';

export type TLightFactory = TReactiveFactory<TAbstractLightWrapper<TLight>, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
