import type { TParamsFromConfig, TReactiveFactory } from '@/Abstract';
import type { TAnyLightConfig, TAnyLightWrapper, TLightParams, TLightServiceDependencies } from '@/Light/Models';

export type TLightFactory = TReactiveFactory<TAnyLightWrapper, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
