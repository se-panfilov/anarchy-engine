import type { TWithNameRequired } from '@/Engine/Mixins';

import type { TMaterialTexturePack } from './TMaterialTexturePack';
import type { TWithMaterialType } from './TWithMaterialType';

export type TMaterialProps = Readonly<{ options?: Record<string, any>; textures?: TMaterialTexturePack }> & TWithMaterialType & TWithNameRequired;
