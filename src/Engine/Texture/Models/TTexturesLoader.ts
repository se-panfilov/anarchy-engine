import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TTexture } from './TTexture';
import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';
import type { TTextureMetaInfoRegistry } from './TTextureMetaInfoRegistry';
import type { TTextureResourceConfig } from './TTextureResourceConfig';

export type TTexturesLoader = TAbstractLoader<TTexture, TTextureResourceConfig, TTextureAsyncRegistry, TTextureMetaInfoRegistry>;
