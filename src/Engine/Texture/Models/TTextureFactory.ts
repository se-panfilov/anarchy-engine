import type { TAsyncReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TTextureLoadedPack } from './TTextureLoadedPack';
import type { TTextureParams } from './TTextureParams';

export type TTextureFactory = TAsyncReactiveFactory<TTextureLoadedPack, TTextureParams> & TDestroyable;
