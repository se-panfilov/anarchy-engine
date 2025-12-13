import type { TAbstractResourceConfig } from '@Engine/Abstract';

import type { TTextureOptions } from './TTextureOptions';

export type TTextureResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TTextureOptions;
  }>;
