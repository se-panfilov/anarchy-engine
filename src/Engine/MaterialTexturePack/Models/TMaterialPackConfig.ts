import type { MaterialType, TMaterialConfig } from '@/Engine/Material';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackConfig<T extends TMaterialTexturePack> = Readonly<{ type: MaterialType; params?: Omit<TMaterialConfig, 'type'>; textures?: T }>;
