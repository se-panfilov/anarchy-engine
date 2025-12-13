import type { TParamsFromConfig, TAsyncReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesFactory = TAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> & TParamsFromConfig<IParticlesConfig, IParticlesParams> & TDestroyable;
