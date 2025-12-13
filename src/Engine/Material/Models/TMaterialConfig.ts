import type { TMaterialConfigOptions } from './TMaterialConfigOptions';
import type { TMaterialConfigTextures } from './TMaterialConfigTextures';
import type { TMaterialProps } from './TMaterialProps';

export type TMaterialConfig = Omit<TMaterialProps, 'options'> &
  Readonly<{
    options?: TMaterialConfigOptions;
    textures?: TMaterialConfigTextures;
  }>;
