import type { TParamsFromConfig, TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TAnyLightConfig, TAnyLightWrapper, TLightParams, TLightServiceDependencies } from '@Anarchy/Engine/Light/Models';

export type TLightFactory = TReactiveFactory<TAnyLightWrapper, TLightParams, TLightServiceDependencies> & TParamsFromConfig<TAnyLightConfig, TLightParams>;
