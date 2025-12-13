import type { TMaterialConfigOptions } from './TMaterialConfigOptions';
import type { TMaterialConfigTextures } from './TMaterialConfigTextures';
import type { TMaterialParams } from './TMaterialParams';

export type TMaterialConfig = Omit<TMaterialParams, 'options' | 'textures'> &
  Readonly<{
    options?: TMaterialConfigOptions;
    textures?: TMaterialConfigTextures;
  }>;
