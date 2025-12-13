import type { TMaterialParamsOptions } from './TMaterialParamsOptions';
import type { TMaterialParamsTextures } from './TMaterialParamsTextures';
import type { TMaterialProps } from './TMaterialProps';

export type TMaterialParams = Omit<TMaterialProps, 'options'> &
  Readonly<{
    options?: TMaterialParamsOptions;
    textures?: TMaterialParamsTextures;
  }>;
