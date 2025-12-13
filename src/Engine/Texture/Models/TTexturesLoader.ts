import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TTexture } from './TTexture';
import type { TTextureResourceConfig } from './TTextureResourceConfig';

export type TTexturesLoader = TAbstractLoader<TTexture, TTextureResourceConfig>;
