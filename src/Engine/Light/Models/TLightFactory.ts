import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TAnyLightConfig, TAnyLightWrapper, TLightParams, TLightServiceDependencies } from '@/Engine/Light/Models';

export type TLightFactory = TReactiveFactory<TAnyLightWrapper, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
