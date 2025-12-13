import type { TAbstractResourceAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TTexture } from './TTexture';

export type TTextureAsyncRegistry = TProtectedRegistry<TAbstractResourceAsyncRegistry<TTexture>>;
