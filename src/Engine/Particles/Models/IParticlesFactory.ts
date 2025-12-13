import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesParams } from './IParticlesParams';
import type { TParticlesWrapperAsync } from './TParticlesWrapperAsync';

export type IParticlesFactory = TAsyncReactiveFactory<TParticlesWrapperAsync, IParticlesParams> & TParamsFromConfig<IParticlesConfig, IParticlesParams> & TDestroyable;
