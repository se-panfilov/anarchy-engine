import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextureFactory } from '@/Engine/Domains/Texture/Models';
import { TextureWrapper } from '@/Engine/Domains/Texture/Wrapper';

export const TextureFactory: ITextureFactory = { ...ReactiveFactory(FactoryType.Texture, TextureWrapper) };
