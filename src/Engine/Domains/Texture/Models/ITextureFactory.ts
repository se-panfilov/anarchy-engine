import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextureConfig, ITextureParams, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextureFactory = IReactiveFactory<ITextureWrapper, ITextureParams> & IParamsFromConfig<ITextureConfig, ITextureParams> & IDestroyable;
