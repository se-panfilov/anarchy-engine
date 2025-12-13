import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITexture, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextureFactory = IReactiveFactory<ITextureWrapper, ITexture> & IDestroyable;
