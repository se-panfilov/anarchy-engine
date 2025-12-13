import type { TMaterialProps } from '@/Engine/Material/Models';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackParams<T extends TMaterialTexturePack> = Readonly<{ params?: TMaterialProps; textures?: T }>;
