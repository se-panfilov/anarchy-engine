import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TTextureOptions } from './TTextureOptions';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TTextureOptions;
  }>;
