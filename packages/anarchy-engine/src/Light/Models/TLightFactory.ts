import type { TParamsFromConfig, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyLightConfig, TAnyLightWrapper, TLightParams, TLightServiceDependencies } from '@hellpig/anarchy-engine/Light/Models';

export type TLightFactory = TReactiveFactory<TAnyLightWrapper, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
