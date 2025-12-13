import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLight, TAnyLightConfig, TLightParams, TLightServiceDependencies } from '@/Engine/Light/Models';

export type TLightFactory = TReactiveFactory<TAbstractLightWrapper<TAnyLight>, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
