import type { IAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesFactory = IAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> & IParamsFromConfig<IParticlesConfig, IParticlesParams> & IDestroyable;
