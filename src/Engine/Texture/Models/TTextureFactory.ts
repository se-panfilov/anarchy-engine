import type { TAsyncReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TTexture } from './TTexture';
import type { TTextureParams } from './TTextureParams';

export type TTextureFactory = TAsyncReactiveFactory<TTexture, TTextureParams> & TDestroyable;
