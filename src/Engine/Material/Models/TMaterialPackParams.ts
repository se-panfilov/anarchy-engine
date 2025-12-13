import type { MaterialType } from '@/Engine/Material/Constants';

import type { TMaterialProps } from './TMaterialProps';
import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackParams<T extends TMaterialTexturePack> = Readonly<{ type: MaterialType; params?: TMaterialProps; textures?: T }>;
