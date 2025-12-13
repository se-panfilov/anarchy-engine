import type { TAsyncReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TTextureLoadedPack } from './TTextureLoadedPack';
import type { TTexturePackParams } from './TTexturePackParams';

export type TTextureFactory = TAsyncReactiveFactory<TTextureLoadedPack, TTexturePackParams> & TDestroyable;
