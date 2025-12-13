import type { MaterialType } from '@/Engine/Material/Constants';
import type { TWithNameRequired } from '@/Engine/Mixins';

import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialProps = Readonly<{ type: MaterialType; options?: Record<string, any>; textures?: TMaterialTexturePack }> & TWithNameRequired;
