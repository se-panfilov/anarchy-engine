import type { MaterialType } from '@/Engine/Material';
import type { IMaterialProps } from '@/Engine/Material/Models';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IMaterialPackProps<T extends IMaterialTexturePack> = Readonly<{ type: MaterialType; params?: IMaterialProps; textures?: T }>;
