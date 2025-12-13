import type { MaterialType } from '@/Engine/Material';
import type { IMaterialTexturePack } from '@/Engine/Texture';

import type { IMaterialParams } from './IMaterialParams';

export type IMaterialProps<T extends IMaterialTexturePack> = Readonly<{ type: MaterialType; params?: IMaterialParams; textures?: T }>;
