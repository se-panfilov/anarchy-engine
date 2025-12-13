import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TTextureLoadedPack } from './TTextureLoadedPack';
import type { TTexturePackConfig } from './TTexturePackConfig';
import type { TTexturePackParams } from './TTexturePackParams';

export type TTextureFactory = TAsyncReactiveFactory<TTextureLoadedPack, TTexturePackParams> & TParamsFromConfig<TTexturePackConfig, TTexturePackParams> & TDestroyable;
