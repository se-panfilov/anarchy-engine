import type { MaterialType } from '@/Engine/Material';
import type { IMaterialProps } from '@/Engine/Material/Models';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type IMaterialPackParams<T extends TMaterialTexturePack> = Readonly<{ type: MaterialType; params?: IMaterialProps; textures?: T }>;
