import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Engine/Abstract';

import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesConfigToParamsDependencies } from './TParticlesConfigToParamsDependencies';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesWrapper } from './TParticlesWrapper';

export type TParticlesFactory = TReactiveFactory<TParticlesWrapper, TParticlesParams> & TParamsFromConfigWithDependencies<TParticlesConfig, TParticlesParams, TParticlesConfigToParamsDependencies>;
