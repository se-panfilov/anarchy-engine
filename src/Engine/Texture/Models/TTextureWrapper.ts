import type { TWrapper } from '@/Engine/Abstract';

import type { TTexture } from './TTexture';

export type TTextureWrapper = TWrapper<TTexture> &
  Readonly<{
    // TODO 9.0.0. RESOURCES: all wrappers with preloaded resources should have a name
    getName: () => string;
  }>;
