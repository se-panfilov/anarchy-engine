import type { TAbstractLoader } from '@/Abstract';

import type { TTexture } from './TTexture';
import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';
import type { TTextureMetaInfoRegistry } from './TTextureMetaInfoRegistry';
import type { TTextureResourceConfig } from './TTextureResourceConfig';

export type TTexturesLoader = TAbstractLoader<TTexture, TTextureResourceConfig, TTextureAsyncRegistry, TTextureMetaInfoRegistry>;
