import type { TWithName, TWithTags } from '@/Engine/Mixins';

import type { TMaterialParamsOptions } from './TMaterialParamsOptions';
import type { TMaterialParamsTextures } from './TMaterialParamsTextures';
import type { TWithMaterialType } from './TWithMaterialType';

export type TMaterialParams = Readonly<{
  options?: TMaterialParamsOptions;
  textures?: TMaterialParamsTextures;
}> &
  TWithMaterialType &
  TWithName &
  TWithTags;
