import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesWrapperAsync } from './TParticlesWrapperAsync';

export type TParticlesFactory = TAsyncReactiveFactory<TParticlesWrapperAsync, TParticlesParams> & TParamsFromConfig<TParticlesConfig, TParticlesParams> & TDestroyable;
