import type { TMaterialConfig } from '@/Engine/Material';
import type { TWithNameRequired } from '@/Engine/Mixins';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackConfig<T extends TMaterialTexturePack> = Readonly<{ params?: Omit<TMaterialConfig, 'type'>; textures?: T }> & TWithNameRequired;
