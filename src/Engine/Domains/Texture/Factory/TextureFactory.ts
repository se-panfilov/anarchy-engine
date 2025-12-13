import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Texture/Adapter';
import type { ITextureFactory, ITextureParams, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import { TextureWrapper } from '@/Engine/Domains/Texture/Wrapper';

const factory: IReactiveFactory<ITextureWrapper, ITextureParams> = { ...ReactiveFactory(FactoryType.Texture, TextureWrapper) };
export const TextureFactory = (): ITextureFactory => ({ ...factory, configToParams });
