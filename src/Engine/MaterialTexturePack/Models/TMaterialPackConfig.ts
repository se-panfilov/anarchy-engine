import type { IMaterialConfig, MaterialType } from '@/Engine/Material';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackConfig<T extends TMaterialTexturePack> = Readonly<{ type: MaterialType; params?: Omit<IMaterialConfig, 'type'>; textures?: T }>;
