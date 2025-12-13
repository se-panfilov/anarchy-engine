import type { TAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesFactory = TAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> & IParamsFromConfig<IParticlesConfig, IParticlesParams> & TDestroyable;
