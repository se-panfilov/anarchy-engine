import type { MaterialType } from '@/Engine/Material';
import type { IMaterialTexturePack } from '@/Engine/Texture';

import type { IMaterialParams } from './IMaterialParams';

export type IMaterialPackProps<T extends IMaterialTexturePack> = Readonly<{ type: MaterialType; params?: IMaterialParams; textures?: T }>;
