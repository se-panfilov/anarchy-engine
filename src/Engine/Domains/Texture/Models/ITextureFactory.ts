import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextureParams, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextureFactory = IReactiveFactory<ITextureWrapper, ITextureParams> & IDestroyable;
