import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithTagsMixin } from '@/Engine/Mixins';

import type { IParticles } from './IParticles';

export type IParticlesWrapper = IWrapper<IParticles> & IWithTagsMixin & IDestroyable;
