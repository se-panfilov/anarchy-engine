import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TTextureLoadedPack } from './TTextureLoadedPack';
import type { TTexturePackParams } from './TTexturePackParams';
import type { TTextureResourceConfig } from './TTextureResourceConfig';

export type TTextureFactory = TAsyncReactiveFactory<TTextureLoadedPack, TTexturePackParams> & TParamsFromConfig<TTextureResourceConfig, TTexturePackParams> & TDestroyable;
