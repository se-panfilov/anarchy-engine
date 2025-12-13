import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TTexture } from './TTexture';

export type TTextureAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<TTexture>>;
