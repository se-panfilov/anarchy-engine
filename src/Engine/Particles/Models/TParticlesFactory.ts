import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesWrapper } from './TParticlesWrapper';

export type TParticlesFactory = TReactiveFactory<TParticlesWrapper, TParticlesParams> & TParamsFromConfig<TParticlesConfig, TParticlesParams> & TDestroyable;
