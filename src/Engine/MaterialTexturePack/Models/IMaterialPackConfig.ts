import type { IMaterialConfig, MaterialType } from '@/Engine/Material';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IMaterialPackConfig<T extends IMaterialTexturePack> = Readonly<{ type: MaterialType; params?: Omit<IMaterialConfig, 'type'>; textures?: T }>;
