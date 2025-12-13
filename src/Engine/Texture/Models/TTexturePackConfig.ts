import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TTextureConfig } from '@/Engine/Texture';

export type TTexturePackConfig = Omit<TAbstractResourceConfig, 'params'> &
  Readonly<{
    params?: TTextureConfig;
  }>;
