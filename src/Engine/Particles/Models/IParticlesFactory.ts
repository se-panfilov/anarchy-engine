import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapper } from './IParticlesWrapper';

export type IParticlesFactory = IReactiveFactory<IParticlesWrapper, IParticlesParams> & IParamsFromConfig<IParticlesConfig, IParticlesParams> & IDestroyable;
