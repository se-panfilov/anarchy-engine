import type { TAbstractResourceConfig } from '@/Abstract';

import type { TTextureOptions } from './TTextureOptions';

export type TTextureResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TTextureOptions;
  }>;
